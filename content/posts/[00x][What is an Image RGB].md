# What is an image? - RGB edition
## It's what you want it to be

```cpp
#include <cstdint>

// make things easier to read
using u8 = uint8_t;    // 8 bit unsigned integer
using u32 = unsigned;  // 32 bit unsigned integer


typedef struct
{
    u32 width = 0;
    u32 height = 0;

    u8* red_data = nullptr;
    u8* green_data = nullptr;
    u8* blue_data = nullptr;

} RGBImagePlanar;
```

Make a new image by allocating memory for it.

```cpp
#include <cassert>

void make_image(RGBImagePlanar& image, u32 width, u32 height)
{
    assert(width);
    assert(height);

    image.width = width;
    image.height = height;

    /*
    image.red_data = (u8*)malloc(sizeof(u8) * width * height);
    image.green_data = (u8*)malloc(sizeof(u8) * width * height);
    image.blue_data = (u8*)malloc(sizeof(u8) * width * height);
    */

    // avoid 3 separate calls to malloc
    auto const channel_size = width * height;
    image.red_data = (u8*)malloc(3u * sizeof(u8) * channel_size);

    assert(image.red_data);

    image.green_data = image.red_data + channel_size;
    image.blue_data = image.green_data + channel_size;

    assert(image.red_data);
}
```

Instead of allocating memory for each channel, one large buffer can be allocated and pointers for each channel can be assigned appropriately.  In this example the red channel gets the first third of the memory, the green channel gets the middle third, and the blue channel gets the final third.

The memory needs to be released when we are done with the image.

```cpp
void dispose_image(RGBImagePlanar& image)
{
    if (image.red_data != nullptr)
    {
        free(image.red_data);
        image.red_data = nullptr;
    }
}
```

Each channel can be processed individually.

```cpp
#include <functional>

void for_each_pixel_ch(u8* ch_data, u32 width, u32 height, std::function<void(u8& ch)> const& func)
{
    for(size_t i = 0; i < width * height; ++i)
    {
        func(ch_data[i]);
    }
}


void process_image_by_channel(RGBImagePlanar const& image)
{
    auto const red_func   = [](u8& r){ /* do something with red channel */ };
    auto const green_func = [](u8& g){ /* do something with green channel */ };
    auto const blue_func  = [](u8& b){ /* do something with blue channel */ };

    auto const w = image.width;
    auto const h = image.height;

    // process each channel separately
    // safe to run in parallel
    for_each_pixel_ch(image.red_data,   w, h, red_func);
    for_each_pixel_ch(image.green_data, w, h, green_func);
    for_each_pixel_ch(image.blue_data,  w, h, blue_func);
}
```

It may seem inefficient to iterate over an image 3 times, and it is.  But having the image's memory organized in this manner means that each channel is independent.  Each channel can be processed on a separate thread without interfering with the others allowing to process the channels in parallel.

Since each channel is essentially a pointer with a width and a height, we can treat them each as grayscale images.  Any algorithm that can be used on a grayscale image can be used on an individual channel as well.

A pixel is effectively the red, green and blue values at the same relative offset.

```cpp

void for_each_pixel(RGBImagePlanar const& image, std::function<void(u8& r, u8& g, u8& b)> const& func)
{
    for(size_t i = 0; i < image.width * image.height; ++i)
    {
        func(image.red_data[i], image.green_data[i], image.blue_data[i]);
    }
}
```

Iterate over an image in terms of the x and y coordinates

```cpp
void for_each_pixel(RGBImagePlanar const& image, std::function<void(u8& r, u8& g, u8& b, u32 x, u32 y)> const& func)
{
    for(u32 y = 0; y < image.height; ++y)
    {
        auto row_offset = static_cast<size_t>(y * image.width);

        auto red_row_begin = image.red_data + row_offset;
        auto green_row_begin = image.green_data + row_offset;
        auto blue_row_begin = image.blue_data + row_offset;

        for(u32 x = 0; x < image.width; ++x)
        {
            auto& r = red_row_begin[x];
            auto& g = green_row_begin[x];
            auto& b = blue_row_begin[x];

            func(r, g, b, x, y);
        }
    }
}
```

We can also allow for parallel processing in terms of the x and y coordinates.

```cpp
void for_each_pixel_ch(u8* ch_data, u32 width, u32 height, std::function<void(u8& ch, u32 x, u32 y)> const& func)
{
    for(u32 y = 0; y < height; ++y)
    {
        auto row_offset = static_cast<size_t>(y * width);
        auto row_begin = ch_data + row_offset;

        for(u32 x = 0; x < width; ++x)
        {
            auto& ch = row_begin[x];
            func(ch, x, y);
        }
    }
}


void process_image_by_channel_xy(RGBImagePlanar const& image)
{
    auto const red_func   = [](u8& r, u32 x, u32 y){ /* do something with red channel */ };
    auto const green_func = [](u8& g, u32 x, u32 y){ /* do something with green channel */ };
    auto const blue_func  = [](u8& b, u32 x, u32 y){ /* do something with blue channel */ };

    auto const w = image.width;
    auto const h = image.height;

    // process each channel separately
    // safe to run in parallel
    for_each_pixel_ch(image.red_data,   w, h, red_func);
    for_each_pixel_ch(image.green_data, w, h, green_func);
    for_each_pixel_ch(image.blue_data,  w, h, blue_func);
}
```

We can define a pixel as a struct with individual values for red, green and blue.

```cpp
typedef struct
{
    u8 red = 0;
    u8 green = 0;
    u8 blue = 0;

} RGBPixel;
```

We can get the pixel values at a given x and y position like so.

```cpp
RGBPixel get_pixel(RGBImagePlanar const& image, u32 x, u32 y)
{
    auto row_offset = static_cast<size_t>(y * image.width);

    auto red_row_begin = image.red_data + row_offset;
    auto green_row_begin = image.green_data + row_offset;
    auto blue_row_begin = image.blue_data + row_offset;

    return {
        red_row_begin[x],
        green_row_begin[x],
        blue_row_begin[x]
    };
}
```

We can also assign a new color to a pixel.

```cpp
void set_pixel(RGBImagePlanar const& image, u32 x, u32 y, RGBPixel const& color)
{
    auto row_offset = static_cast<size_t>(y * image.width);

    auto red_row_begin = image.red_data + row_offset;
    auto green_row_begin = image.green_data + row_offset;
    auto blue_row_begin = image.blue_data + row_offset;

    red_row_begin[x] = color.red;
    green_row_begin[x] = color.green;
    blue_row_begin[x] = color.blue;
}
```

### Putting it all together

Sample program below.

```cpp

```