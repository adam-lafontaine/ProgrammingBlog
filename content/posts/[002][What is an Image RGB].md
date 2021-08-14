# What is an image? - RGB(A) edition
## It's just another pointer

Yes, a color image, just like a grayscale image, is simply a pointer to the image memory along with a width and a height.  However the image needs to contain red, green and blue data for each pixel instead of just one grayscale value.  Instead of having one 8 bit value for our pixel, we can define a struct containing an 8 bit value for each color channel.

```cpp
#include <cstdint>

// make things easier to read
using u8 = uint8_t;    // 8 bit unsigned integer
using u32 = unsigned;  // 32 bit unsigned integer


typedef struct RGBPixel_t
{
	u8 red   = 0;
	u8 green = 0;
	u8 blue  = 0;

} RGBPixel;


typedef struct RGBImage_t
{
	u32 width  = 0;
	u32 height = 0;

	RGBPixel* data = nullptr;

} RGBImage;
```

The image struct holds the width and height and a pointer to the pixel data.

We can also have our image contain a fourth channel for the alpha value.

```cpp
typedef struct RGBAPixel_t
{
	u8 red   = 0;
	u8 green = 0;
	u8 blue  = 0;
	u8 alpha = 0;

} RGBAPixel;


typedef struct RGBAImage_t
{
	u32 width  = 0;
	u32 height = 0;

	RGBAPixel* data = nullptr;

} RGBAImage;


// use RGBA for our examples
using Pixel = RGBAPixel;
using Image = RGBAImage;
```

The examples in this post will be done using RGBA images.

Create and destroy images much in the same fashion as grayscale images.

```cpp
void make_image(Image& image, u32 width, u32 height)
{
	assert(width);
	assert(height);

	image.width = width;
	image.height = height;
	image.data = (Pixel*)malloc(sizeof(Pixel) * width * height);

	assert(image.data);
}


void dispose_image(Image& image)
{
	if (image.data != nullptr)
	{
		free(image.data);
		image.data = nullptr;
	}
}
```

Iterate

```cpp
#include <functional>

void for_each_pixel(Image const& image, std::function<void(Pixel& p)> const& func)
{
    for(size_t i = 0; i < image.width * image.height; ++i)
    {
        func(image.data[i]);
    }
}
```

Iterate x y

```cpp
void for_each_pixel(Image const& image, std::function<void(Pixel& p, u32 x, u32 y)> const& func)
{
    for(u32 y = 0; y < image.height; ++y)
    {
        auto row_offset = static_cast<size_t>(y * image.width);
        auto row_begin = image.data + row_offset;

        for(u32 x = 0; x < image.width; ++x)
        {
            func(row_begin[x], x, y);
        }
    }
}
```

Pixel value x y

```cpp
Pixel pixel_value(Image const& image, u32 x, u32 y)
{
    auto row_offset = static_cast<size_t>(y * image.width);
    auto row_begin = image.data + row_offset;

    return row_begin[x];
}
```

![alt text](https://github.com/adam-lafontaine/CMS/raw/master/img/%5B002%5D/bitwise_example.bmp)

This works but is not very expressive, and may require a lesson in bitwise operations as shown in the comments.

