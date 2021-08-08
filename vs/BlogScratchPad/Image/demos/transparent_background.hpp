#pragma once

#include "../../util/libimage/libimage.hpp"
namespace img = libimage;


constexpr auto SRC_PATH = "F:/Pixel-character-1.bmp";
constexpr auto DST_PATH = "out_files/Pixel-character-big.png";





void run()
{
	

	img::image_t src;
	img::read_image_from_file(SRC_PATH, src);

	u32 const w_factor = 256 / src.width;
	u32 const h_factor = 256 / src.height;

	auto const white = img::to_pixel(255, 255, 255).value;
	auto const transparent = img::to_pixel(0, 0, 0, 0).value;

	auto const tr = [&](img::pixel_t& p) 
	{
		if (p.value == white)
		{
			p.value = transparent;
		}
	};

	auto const sb = src.begin();
	auto const se = src.end();

	std::for_each(sb, se, tr);

	img::image_t dst;
	img::make_image(dst, src.width * w_factor, src.height * h_factor);

	u32 src_y = 0;
	u32 src_x = 0;
	for (u32 y = 0; y < dst.height; ++y)
	{
		src_y = y / h_factor;
		auto const row_begin = dst.row_begin(y);
		auto const src_row_begin = src.row_begin(src_y);
		for (u32 x = 0; x < dst.width; ++x)
		{
			src_x = x / w_factor;
			row_begin[x] = src_row_begin[src_x];
		}
	}

	img::write_image(dst, DST_PATH);
}