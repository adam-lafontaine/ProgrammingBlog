#include "image.hpp"

#define STB_IMAGE_IMPLEMENTATION
#include "../../../util/libimage/stb_wrapper/stb_image.h"

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "../../../util/libimage/stb_wrapper/stb_image_write.h"

#include <cassert>


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


void read_image_from_file(const char* img_path_src, Image& image_dst)
{
    int width = 0;
    int height = 0;
    int image_channels = 0;
    int desired_channels = 4;

    auto data = (Pixel*)stbi_load(img_path_src, &width, &height, &image_channels, desired_channels);

    assert(data);
    assert(width);
    assert(height);

    image_dst.data = data;
    image_dst.width = width;
    image_dst.height = height;
}


void write_image(Image const& image_src, const char* file_path_dst)
{
    assert(image_src.width);
    assert(image_src.height);
    assert(image_src.data);

    int width = static_cast<int>(image_src.width);
    int height = static_cast<int>(image_src.height);
    int channels = 4;
    auto const data = image_src.data;

    int result = 0;

    result = stbi_write_bmp(file_path_dst, width, height, channels, data);

    assert(result);
}