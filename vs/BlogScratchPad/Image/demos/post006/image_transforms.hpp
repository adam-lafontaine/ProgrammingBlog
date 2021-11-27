#pragma once

#include "../../util/libimage/stb_wrapper/stb_image.h"
#include "../../util/libimage/stb_wrapper/stb_image_write.h"

#include <cassert>
#include <algorithm>

using u32 = unsigned;      // 4 bytes
using u8 = unsigned char;  // 1 byte


class RGBAPixel
{
public:
    u8 red;
    u8 green;
    u8 blue;
    u8 alpha;
};


class RGBAImage
{
public:
    u32 width;
    u32 height;

    RGBAPixel* data;

    RGBAPixel* begin() { return data; }
    RGBAPixel* end() { return data + static_cast<size_t>(width) * static_cast<size_t>(height); }
};


class GrayImage
{
public:
    u32 width;
    u32 height;

    u8* data;

    u8* begin() { return data; }
    u8* end() { return data + static_cast<size_t>(width) * static_cast<size_t>(height); }
};


void make_image(RGBAImage& image, u32 width, u32 height)
{
    assert(width);
    assert(height);

    image.width = width;
    image.height = height;
    image.data = (RGBAPixel*)malloc(sizeof(RGBAPixel) * width * height);

    assert(image.data);
}


void dispose_image(RGBAImage& image)
{
    if (image.data != nullptr)
    {
        free(image.data);
        image.data = nullptr;
    }
}


void make_image(GrayImage& image, u32 width, u32 height)
{
    assert(width);
    assert(height);

    image.width = width;
    image.height = height;
    image.data = (u8*)malloc(sizeof(u8) * width * height);

    assert(image.data);
}


void dispose_image(GrayImage& image)
{
    if (image.data != nullptr)
    {
        free(image.data);
        image.data = nullptr;
    }
}


void read_image_from_file(const char* img_path_src, RGBAImage& image_dst)
{
    int width = 0;
    int height = 0;
    int image_channels = 0;
    int desired_channels = 4;

    auto data = (RGBAPixel*)stbi_load(img_path_src, &width, &height, &image_channels, desired_channels);

    assert(data);
    assert(width);
    assert(height);

    image_dst.data = data;
    image_dst.width = width;
    image_dst.height = height;
}

void write_image(GrayImage const& image_src, const char* file_path_dst)
{
    assert(image_src.width);
    assert(image_src.height);
    assert(image_src.data);

    int width = static_cast<int>(image_src.width);
    int height = static_cast<int>(image_src.height);
    int channels = 1;
    auto const data = image_src.data;

    int result = 0;

    result = stbi_write_bmp(file_path_dst, width, height, channels, data);

    assert(result);
}



u8 to_grayscale(u8 red, u8 green, u8 blue)
{
    return static_cast<u8>(0.299 * red + 0.587 * green + 0.114 * blue);
}


void convert_to_grayscale(RGBAImage& src, GrayImage& dst)
{
    assert(src.data);
    assert(dst.data);
    assert(src.width == dst.width);
    assert(src.height == dst.height);

    auto const convert = [](RGBAPixel const& p) { return to_grayscale(p.red, p.green, p.blue); };

    std::transform(src.begin(), src.end(), dst.begin(), convert);
}


void binarize_simple(GrayImage& src, GrayImage& dst)
{
    assert(src.data);
    assert(dst.data);
    assert(src.width == dst.width);
    assert(src.height == dst.height);

    auto const convert = [](u8 p) { return p > 150 ? 255 : 0; };

    std::transform(src.begin(), src.end(), dst.begin(), convert);
}


void binarize_simple(GrayImage& src_dst)
{
    assert(src_dst.data);

    auto const convert = [](u8& p) { p = p > 150 ? 255 : 0; };

    std::for_each(src_dst.begin(), src_dst.end(), convert);
}


auto constexpr sprites_src = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/out_files/sprites.png";
auto constexpr sprites_gray_dst = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/out_files/sprites_gray.bmp";
auto constexpr binary_dst = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/out_files/binary.bmp";


void run()
{
    RGBAImage rgba;
    read_image_from_file(sprites_src, rgba);

    auto width = rgba.width;
    auto height = rgba.height;

    GrayImage gray;
    make_image(gray, width, height);
    convert_to_grayscale(rgba, gray);
    write_image(gray, sprites_gray_dst);

    binarize_simple(gray);
    write_image(gray, binary_dst);
}