---
sidebar_position: 90
---

yaw(偏航角) pitch(俯仰角) roll(滚动角)

[1]: http://cdn.lysander.top/欧拉角.png

## Camera

```js
// Set the initial camera view to look at Manhattan
// longitude, latitude, height 曼哈顿[74W,40N] The height, in meters, above the ellipsoid.
var initialPosition = Cesium.Cartesian3.fromDegrees(
  -74.01881302800248,
  40.69114333714821,
  753
)
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
  21.27879878293835,
  -21.34390550872461,
  0.0716951918898415
)
viewer.scene.camera.setView({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
})
```

### Matrix4

identity matrix(单位矩阵)

```js
/**
 * An immutable Matrix4 instance initialized to the identity matrix.
 *
 * @type {Matrix4}
 * @constant
 */
Matrix4.IDENTITY = freezeObject(
  new Matrix4(
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0
  )
)

/**
 * An immutable Matrix4 instance initialized to the zero matrix.
 *
 * @type {Matrix4}
 * @constant
 */
Matrix4.ZERO = freezeObject(
  new Matrix4(
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
  )
)
```

### HeadingPitchRoll

[在 Cesium 中，Heading 就是 yaw](https://blog.csdn.net/u011575168/article/details/83097894)  
[四元数(Quaternions)](https://blog.csdn.net/u011575168/article/details/83034048)

> Heading=yaw，表示相机绕 Up 轴旋转，Up 轴为+Z 轴，且定义绕-Z 轴旋转为正。
> Pitch，表示相机绕 Right 轴旋转，Right 轴为-Y 轴，且定义绕-Y 轴旋转为正。
> Roll，表示相机绕 Direction 轴（视线方向）旋转，Direction 轴为+X 轴，且绕+X 轴旋转为正。

在 Cesium 中，常使用对象 headingPitchRoll 来表示相机的三次旋转角度，使用 heading 属性表示绕 z 轴旋转的角度（绕-z 轴为正）；使用 pitch 表示绕 y 轴旋转的角度(绕-y 轴为正）；使用 roll 表示绕 x 轴旋转角度（绕+x 轴为正）；旋转顺序仍为 321（ZYX)。

> ψ = −heading
> θ = −pitch
> ϕ = roll

## Euler angles

> 欧拉角是用来唯一地确定定点转动明体位置的三个一组独立角参量，由章动角 θ、进动角 ψ 和自转角 φ 组成，为 L.欧拉首先提出,故得名。

[如何通俗地解释欧拉角？之后为何要引入四元数](https://www.zhihu.com/question/47736315)

- pitch(俯仰)
- yaw(偏航)
- roll(桶滚)

在 3D 系统中，假设视点为原点，则视点坐标系如下图所示，通常 z 轴的负方向是视点方向(OpenGL)
![欧拉角][1]

- gimbal lock
  万向节死锁的根源在于欧拉角的定义方式
  万向节死锁的结果，不是说不能旋转了，而是会导致旋转不自然
  要规避万向节死锁，需要选择合适的旋转顺序（有 12 种旋转顺序）

欧拉角是用来表示三维坐标系中方向和方向变换的。我们平时说的欧拉角还可以细分为欧拉角(Euler-angles)和泰特布莱恩角(Tait-Bryan-angles)，这两种方法都利用了笛卡尔坐标系的三轴作为旋转轴，主要区别在于选取顺序。

## Quaternions

在编程中很难规避死锁问题，所以现在很多时候都使用四元数实现旋转
