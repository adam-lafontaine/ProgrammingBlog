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

} RGBImage;
```

```cpp
#include <functional>

void make_image(RGBImage& image, u32 width, u32 height)
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
    image.red_data = (u8*)malloc( 3u * sizeof(u8) * width * height);
    image.green_data = image.red_data + (width * height);
    image.blue_data = image.green_data + (width * height);

    assert(image.data);
}


void dispose_image(RGBImage& image)
{
    if (image.red_data != nullptr)
    {
        free(image.red_data);
        image.red_data = nullptr;
    }
}


void for_each_pixel(RGBImage const& image, std::function<void(u8& r, u8& g, u8& b> const& func)
{
    for(size_t i = 0; i < image.width * image.height; ++i)
    {
        func(image.red_data[i], image.green_data[i], image.blue_data[i]);
    }
}
```

```cpp
void for_each_pixel_ch(u8* ch_data, u32 width, u32 height, std::function<void(u8& ch)> const& func)
{
    for(size_t i = 0; i < width * height; ++i)
    {
        func(ch_data[i]);
    }
}


void process_image(RGBImage const& image)
{
    auto const red_func   = [](u8& r){ /* do something with red channel */};
    auto const green_func = [](u8& g){ /* do something with green channel */};
    auto const blue_func  = [](u8& b){ /* do something with blue channel */};

    auto const w = iamge.width;
    auto const h = image.height;

    // process each channel separately
    // safe to run in parallel
    for_each_pixel_ch(image.red_data, w, h, red_func);
    for_each_pixel_ch(image.green_data, w, h, green_func);
    for_each_pixel_ch(image.blue_data, w, h, blue_func);
}

```