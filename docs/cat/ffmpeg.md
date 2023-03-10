---
slug: ffmpeg
sidebar_position: 1
title: FFmpeg 视频处理
tags: [ffmpeg, opencv]
---

## FFmpeg

推流

```
ffmpeg -re -i demo.mp4 -c copy -f flv rtmp://127.0.0.1/live/test
```

播放

```
ffplay -f lavfi -i "movie=demo.mp4,delogo=x=90:y=1:w=120:h=100:show=1" -hide_banner
```

去水印

```
ffmpeg -i demo.mp4 -vf delogo=x=90:y=1:w=120:h=100 delogo.mp4
```

加水印

```
ffmpeg -i demo.mp4 -i kog.jpeg -filter_complex "overlay=x=90:y=1" overlay.mp4
```

提取视频

```
ffmpeg -i demo.mp4 -an -vcodec copy video.mp4
```

提取音频 demuxing

```
ffmpeg -i demo.mp4 -vn -acodec copy audio.aac
```

添加音轨 muxing

```
ffmpeg -i audio.aac -i video.mp4 merge.mp4
```

剪切

```
ffmpeg -ss 00:01:30 -to 00:02:20 -i demo.mp4 -c copy cut.mp4
ffmpeg -ss 00:01:30 -t 20 -i demo.mp4 -c copy cut.mp4
```

## OpenCV

安装

```
pip3 install numpy matplotlib opencv_python
```

```py
################ 单目标匹配
### 用 模板 在 原图上 滑动，然后计算像素差（匹配程度），把像素差放到对应的位置上，（类似于卷积过程）
# 全部滑动完毕后，找到像素差最小的坐标，还原到原图得到原图坐标，加上模板宽高就是 目标在原图上的位置

## 注意，只是取最小差，即使 原图中没有和模板相似的区域，也有个最小差，这时仍然会取最小差，比较死板，
# 比较直观的优化思路是设定一个阈值，至少保证大于阈值才算匹配

import cv2
import matplotlib.pyplot as plt

img = cv2.imread('img.png', 0)
print('img shape', img.shape)
template = cv2.imread('template.png', 0)   # 模板可以和原图上的匹配区域 像素 不完全一致，取最小差即可,但对应位置必须一致
print('template shape', template.shape)
w, h = template.shape[: : -1]

# 列表中所有的6种比较方法
# methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR, cv2.TM_CCORR_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]
methods = [cv2.TM_CCOEFF]
for method in methods:
    print(method)
    img = img.copy()
    # 应用模板匹配
    res = cv2.matchTemplate(img, template, method)
    print('res shape', res.shape)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    # 如果方法是TM_SQDIFF或TM_SQDIFF_NORMED，则取最小值
    if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
        top_left = min_loc  # (x, y)
    else:
        top_left = max_loc
    bottom_right = (top_left[0] + w, top_left[1] + h)
    cv2.rectangle(img, top_left, bottom_right, 255, 2)
    plt.subplot(121), plt.imshow(res, cmap='gray')
    plt.title('Matching Result'), plt.xticks([]), plt.yticks([])

    plt.subplot(122), plt.imshow(img, cmap='gray')
    plt.title('Detected Point'), plt.xticks([]), plt.yticks([])
    plt.suptitle(method)
    plt.show()

```

## References

1. [FFmpeg Crash Course](https://www.youtube.com/watch?v=yieG9DZQ_vM)
1. [Template Matching](https://docs.opencv.org/4.x/d4/dc6/tutorial_py_template_matching.html)
1. [模板匹配](https://www.osgeo.cn/opencv-python/ch08-advproc/sec01-template-matching.html)
1. [模板匹配与特征点匹配](https://www.cnblogs.com/yanshw/p/15603757.html)
