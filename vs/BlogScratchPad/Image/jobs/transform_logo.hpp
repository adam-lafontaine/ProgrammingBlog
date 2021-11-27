#pragma once

#include "../../util/libimage/proc/process.hpp"
#include "../../util/libimage/math/math.hpp"
#include "../../util/libimage/libimage.hpp"

namespace img = libimage;


inline void make_binary()
{
	auto const logo_start = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/in_files/logo_start.png";
	auto const logo_gray = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/in_files/logo_gray.png";
	auto const logo_binary = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/in_files/logo_binary.png";
	auto const logo_edges = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/in_files/logo_edges.png";
	auto const logo_gray2 = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/in_files/logo_gray2.png";
	auto const logo_finish = "C:/D_Data/repos/ProgrammingBlog/vs/BlogScratchPad/Image/in_files/logo_finish.png";

	img::gray::image_t src_gray;
	img::read_image_from_file(logo_gray, src_gray);

	auto width = src_gray.width;
	auto height = src_gray.height;

	auto const stats = img::calc_stats(src_gray);


	img::gray::image_t dst_gray;
	img::make_image(dst_gray, width, height);

	auto const func = [](u8 p) 
	{ 
		if (p > 172 && p < 190) 
		{
			return (u8)172;
		}

		if (p > 220)
		{
			return (u8)255;
		}

		if (p < 20)
		{
			return (u8)0;
		}

		return p;
	};

	img::transform_self(src_gray, func);

	auto const clean = [&](auto& src, auto& dst) 
	{
		for (u32 y = 1; y < height - 1; ++y)
		{
			auto s_row = src.row_begin(y);
			auto d_row = dst.row_begin(y);
			auto top_row = src.row_begin(y - 1);
			auto bottom_row = src.row_begin(y + 1);
			for (u32 x = 1; x < width - 1; ++x)
			{
				d_row[x] = s_row[x];

				auto top = top_row[x];
				auto bottom = bottom_row[x];
				if (top == bottom)
				{
					d_row[x] = top;
					continue;
				}

				auto left = s_row[x - 1];
				auto right = s_row[x + 1];
				if (left == right)
				{
					d_row[x] = left;
				}

			}
		}
	};

	
	clean(src_gray, dst_gray);
	clean(dst_gray, src_gray);
	clean(src_gray, dst_gray);

	auto const color = img::to_pixel(190, 58, 52);
	auto const black = img::to_pixel(0, 0, 0);
	img::image_t dst_image;
	img::make_image(dst_image, width, height);

	auto const set_color = [&](img::gray::image_t const& src, img::image_t& dst) 
	{
		for (u32 y = 0; y < height; ++y)
		{
			auto s_row = src.row_begin(y);
			auto d_row = dst.row_begin(y);

			if (y == 0 || y == height - 1)
			{
				for (u32 x = 0; x < width; ++x)
				{
					d_row[x] = black;
				}
				continue;
			}

			auto top_row = src.row_begin(y - 1);
			auto bottom_row = src.row_begin(y + 1);
			for (u32 x = 0; x < width; ++x)
			{
				auto p = s_row[x];

				if (x == 0 || x == width - 1 || p < 20)
				{
					d_row[x] = black;
					continue;
				}

				if (s_row[x] == 172)
				{
					d_row[x] = color;
					continue;
				}

				if (p > 172)
				{
					d_row[x] = img::to_pixel(p, p, p);
					continue;
				}

				auto top = top_row[x];
				auto bottom = bottom_row[x];
				auto left = s_row[x - 1];
				auto right = s_row[x + 1];

				auto a = p / 172.0;

				auto red = static_cast<u8>(a * color.red);
				auto green = static_cast<u8>(a * color.green);
				auto blue = static_cast<u8>(a * color.blue);

				d_row[x] = img::to_pixel(red, green, blue);
			}
		}
	};

	set_color(dst_gray, dst_image);

	img::write_image(dst_image, logo_finish);
}
