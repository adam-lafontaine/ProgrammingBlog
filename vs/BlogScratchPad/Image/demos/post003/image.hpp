#pragma once

#include <functional>

using u8 = unsigned char;
using u32 = unsigned;


typedef struct RGBAPixel_t
{
    u8 red = 0;
    u8 green = 0;
    u8 blue = 0;
    u8 alpha = 0;

} Pixel;


typedef struct RGBAImage_t
{
    u32 width = 0;
    u32 height = 0;

    Pixel* data = nullptr;

} Image;


bool operator == (Pixel const& lhs, Pixel const& rhs);


void dispose_image(Image& image);

void for_each_pixel(Image const& image, std::function<void(Pixel& p)> const& func);

Pixel pixel_value(Image const& image, u32 x, u32 y);


void read_image_from_file(const char* img_path_src, Image& image_dst);

void write_image(Image const& image_src, const char* file_path_dst);