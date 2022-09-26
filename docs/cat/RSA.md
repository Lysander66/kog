---
sidebar_position: 98
---

# RSA 加密算法

这里没用 crypto 模块，而是用 node-rsa 库

1. js 默认是 pkcs1_oaep，而在 Java 中默认是 pkcs1
2. 导出密钥，对输出的密钥做一些格式化处理，以便 Java 端能直接使用，虽然经过处理但是并不影响 JS 端的密钥导入，及正确性。
   去掉 `+++--BEGIN PUBLIC KEY+++--` 等

## JavaScript

```js
'use strict'
const NodeRSA = require('node-rsa')

module.exports = {
  /**
   * 生成密钥对
   */
  genKeyPair() {
    const key = new NodeRSA()
    // 默认是 pkcs1_oaep，而在Java中默认是 pkcs1
    key.setOptions({ encryptionScheme: 'pkcs1' })
    // bits默认2048，exponent默认65537
    key.generateKeyPair(1024, 65537)
    // 导出密钥，对输出的密钥做一些格式化处理，以便 Java 端能直接使用，虽然经过处理但是并不影响 JS 端的密钥导入，及正确性。
    const publicKey = key
      .exportKey('pkcs8-public-pem')
      .replace(/+++--BEGIN PUBLIC KEY+++--/, '')
      .replace(/+++--END PUBLIC KEY+++--/, '')
      .replace(/\n/g, '')
    const privateKey = key
      .exportKey('pkcs8-private-pem')
      .replace(/+++--BEGIN PRIVATE KEY+++--/, '')
      .replace(/+++--END PRIVATE KEY+++--/, '')
      .replace(/\n/g, '')
    return { publicKey, privateKey }
  },

  /**
   * 公钥加密
   * @param {*} data 待加密的数据
   * @param {*} publicKey 公钥 格式 pkcs8-public-pem
   * @param {*} encoding 加密后输出编码格式
   * @param {*} sourceEncoding 待加密内容的编码格式
   * @returns Base64编码后的字符串
   */
  encrypt(data, publicKey, encoding = 'base64', sourceEncoding = 'utf8') {
    const key = new NodeRSA()
    key.setOptions({ encryptionScheme: 'pkcs1' })
    key.importKey(publicKey, 'pkcs8-public-pem')
    return key.encrypt(data, encoding, sourceEncoding)
  },

  /**
   * 私钥解密
   * @param {*} data Buffer object or base64 encoded string
   * @param {*} privateKey 公钥 格式 pkcs8-private-pem
   * @param {*} encoding 加密之后的类型 buffer OR json, 默认是 buffer
   * @returns 默认返回值类型就是 encoding 的默认值，即 buffer
   */
  decrypt(data, privateKey, encoding = 'buffer') {
    const key = new NodeRSA()
    key.setOptions({ encryptionScheme: 'pkcs1' })
    key.importKey(privateKey, 'pkcs8-private-pem')
    return key.decrypt(data, encoding)
  },
}
```

调用

```js
const { genKeyPair, encrypt, decrypt } = require('./RSAUtil')

let { publicKey, privateKey } = genKeyPair()
console.log(publicKey)
console.log()
console.log(privateKey)

// let data = '{"Luffy":"路飞", "索隆":233, "山治":66.6}'
// let encrypted = encrypt(data, publicKey)
// console.log('\n加密')
// console.log(encrypted)

// 解密demo
privateKey =
  'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMjteBHTvruIBDtwCc1n9ebKBLTvwo19wQZNiZaBUEDSFIc/aJeNQzYj4eoX324+o/KCgDmRI79Z6ZkR6CFjOf0QhMXGByuJ+buv8MAc/9N4+BVa5XD9kRhiBV7oj0+CFm3VJY1UX681wFgdaSSkhOWiJHOUTKUgJwO+IlByqHbDAgMBAAECgYBZT8z+R5vRae1PqkaBKkPQmV2sO6LEF/DT52VQJBzTI06Cq7nHG8CTcTG7R29GZsujQUTT0eMM7F98bcw8AwpD3BKWLNfLN4o4WQ4yvkPz78rGvujRd+Lcg3G5cUUKYTTjGSGhbNsHfOuo2RnxkiQKKrgN6gMUyDKxYw4/qrHE2QJBAONa+dFPVul9mhgffJI6BNi9S2V3sNtHF7IUQLNWN1fsrYnppkb6uZO0SHhP4IWHVYpPPExNgQitsHdZbmDgUv8CQQDiPhp0UYn9CPwH+zOPxpHlIRRgl5Gay2RdmOW6arSCA2XrSArik2aFzTHQeACe25GQE1u7mfNDg8Ban0Zdu1A9AkEA2AIFvEH/N1PoZeb0ehG5rRscWUlAtPV0o/LuDfVqG5V4w8FEA8gPLTBqcjSiAvuz3/asOWqhn9c2BA7p+gznjQJBAKSTvLbE4fY55O0BZV6/ej4NtD8Xwwmxz07u/J6BJNI3GprvC0wLIddPj18xDHKDEv6VtnNf6EBCxVim6I8ixZkCQQCg8Okuq0QCOhLpQAT5puSO0wRd0GhdRUeKTeTtmfXxuqjzm8dHpqeLjAOPHqVX8zHEHRmoKHUXY1IZ1yKBR57m'
let encrypted =
  'HQZVeaullhum9DSHfjMExY7xl/IL8MntaEF15sXZVuw8AlK1M4uJJhWuakPQD5mvOREx/nHJ9AzNwkt0gd0KU1iCd6QjprQSPpLNxqQTnB1p80SmawtjdrR9e07Q8M+4KhCrZEI7lVekewOULZvLTe2duWFjFj0L67ibW9QKF60='

let decrypted = decrypt(encrypted, privateKey).toString()
console.log('\n解密', decrypted)

console.log(JSON.parse(decrypted))
```

## Java

```java
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.security.spec.*;
import java.util.Base64;

public class RSAUtil {

    private static String RSA_ALGORITHM = "RSA";
    private static int KEY_SIZE = 1024;

    public static void main(String[] args) throws Exception {
        /*
        Map map = new HashMap<>();
        map.put("Luffy", "路飞");
        map.put("Zoro", 233);
        map.put("Sanji", 66.6);
        Gson gson = new Gson();
        String content = gson.toJson(map);
        System.out.println(content);
         */

        String content = "{\"Sanji\":66.6,\"Luffy\":\"路飞\",\"Zoro\":233}";
        KeyPair keyPair = genKeyPair();
        String pubKey = encodeBase64(keyPair.getPublic().getEncoded());
        String priKey = encodeBase64(keyPair.getPrivate().getEncoded());
        System.out.println(pubKey);
        System.out.println(priKey);
        byte[] encrypted = encrypt(content.getBytes(), keyPair.getPublic());
        System.out.println("加密\n" + encodeBase64(encrypted));

        /* 解密demo
        String encryptedStr = "gfgG1Mudr0sojYXImV2Nw/vlTt6vvyHeoyiCnn2exRjnkJwE730kQoNWH91236zjaFxmV2h/6e/YIClWUP1dp8y4JUmGyv/SascTo0C8yz//Xp4IBDq4rZt66mmeADY4AcL1NgtAeRP5gsH8J1SaOyr5ON20XALcmpg8s6+9Gvw=";
        String priKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKq8RjjKERNh/7qMMNdVluRpQcbYlVW1Up2NQngm3fe/V3U0Tg4aghiZJZ/UlfA8F+XEbz9zEj52z2pZBE1Ki6JGzXq53IlR75FrTi92eCofe+FPptdyCYh+VwvFE/i9l3U79105hGC8j83Kf41RxEYbEXDVy83KGbMH9LFqoSTNAgMBAAECgYAtoTG3PbHAl2FMDumCszong0X0CbAnftU8jCMmj2SlMLsD9N2jgUwhnNRkWeFUmgrc+lmtAGjwzrnyNyYiLfkRDRv6qbM3jtgRqRH6t9VaieL1xNiWi3OVsvnA5gAs9HJRlc0PcakTCUtqpntU0qrTweDx8WlCVEzMffIUo5HHYQJBAPj3LgcEcCGmwLroc6gwL4Fxq48qh436k8yVp71PWwp56aZa8ftFPJyRBr4HO6jmQW4/8NyxyatTfjdWkipW08kCQQCvjz1e/l/BBJhBJTT1/e28snIW+mYiyeDSrcNjlb42FfWFDmQokD/+DNbG7VheUOEpkhVff6jsK+/f8QfErSLlAkEAmHp6nB2ht1pzq4V2YEmyrqq5keNQRipzntcBdrZFYfMsoJAOp//NkW5ZHMU9SsJKzIUotWHFy8JFCQtiVb/70QJAeSSHfdBb9M4d3f41sHVbonUkYxTAe8sAd4BuLn669YlrlTgcBx2a+syTPEu1ScfXx57FXtOxld6vtMEW0jGCvQJBAIzLJUVmqse5VkiJzKVLZY5naQ+7h305T0jl7gcOI7StZzkEF9xcWEbeW/woFk/lYdCps+El5Wm0LmyIvl+7mq8=";
        PrivateKey privateKey = str2Privatekey(priKey);
        byte[] encrypted = Base64.getDecoder().decode(encryptedStr);
        byte[] decrypted = decrypt(encrypted, privateKey);
        System.out.println("解密\n" + new String(decrypted));
         */
    }

    /**
     * Base64编码
     */
    public static String encodeBase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    /**
     * 将Base64编码后的字符串转成PublicKey对象
     */
    public static PublicKey str2PublicKey(String pubKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] bytes = Base64.getDecoder().decode(pubKey);
        KeySpec keySpec = new X509EncodedKeySpec(bytes);
        return KeyFactory.getInstance(RSA_ALGORITHM).generatePublic(keySpec);
    }

    /**
     * 将Base64编码后的字符串转成PrivateKey对象
     */
    public static PrivateKey str2Privatekey(String priKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] bytes = Base64.getDecoder().decode(priKey);
        KeySpec keySpec = new PKCS8EncodedKeySpec(bytes);
        return KeyFactory.getInstance(RSA_ALGORITHM).generatePrivate(keySpec);
    }

    /**
     * 公钥加密
     *
     * @param data      待加密的数据
     * @param publicKey 公钥
     * @return 加密后的数据
     */
    public static byte[] encrypt(byte[] data, PublicKey publicKey) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(data);
    }

    /**
     * 私钥解密
     *
     * @param data       待解密的数据
     * @param privateKey 私钥
     * @return 解密后的数据
     */
    public static byte[] decrypt(byte[] data, PrivateKey privateKey) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return cipher.doFinal(data);
    }

    /**
     * 生成密钥对
     */
    public static KeyPair genKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
        keyPairGenerator.initialize(KEY_SIZE, new SecureRandom());
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        return keyPair;
    }

}
```

## 参考资料

- [JavaScript 与 Java 跨语言实现 RSA 和 AES 加密算法](https://blog.csdn.net/gulang03/article/details/82230408)
