#include "simd.hpp"
#include "../../../util/stopwatch.hpp"

#include <immintrin.h>
#include <xmmintrin.h>
#include <vector>
#include <cstdio>
#include <algorithm>


using r32 = float;
using r64 = double;


void fill_array(r32* arr, r32 val, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		arr[i] = val;
	}
}


void multiply_single(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		arr_dst[i] = arr_a[i] * arr_b[i];
	}
}


void multiply_4_wide(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	__m128 wa;
	__m128 wb;
	__m128 wdst;

	for (size_t i = 0; i < N; i += 4)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto dst = arr_dst + i;

		wa = _mm_load_ps(a);
		wb = _mm_load_ps(b);

		wdst = _mm_mul_ps(wa, wb);

		_mm_store_ps(dst, wdst);
	}
}


void multiply_8_wide(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	__m256 wa;
	__m256 wb;
	__m256 wdst;

	for (size_t i = 0; i < N; i += 8)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto dst = arr_dst + i;

		wa = _mm256_load_ps(a);
		wb = _mm256_load_ps(b);

		wdst = _mm256_mul_ps(wa, wb);

		_mm256_store_ps(dst, wdst);
	}
}


void multiply()
{
	printf("\nMultiply\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto arr_a = (r32*)malloc(N * sizeof(r32));
	auto arr_b = (r32*)malloc(N * sizeof(r32));
	auto arr_dst = (r32*)malloc(N * sizeof(r32));

	fill_array(arr_a, 3.0f, N);
	fill_array(arr_b, 2.0f, N);
	fill_array(arr_dst, 0.0f, N);

	auto const verify = [&]()
	{
		for (size_t i = 0; i < N; ++i)
		{
			if (arr_dst[i] != 6.0f)
			{
				printf("!!! multiply error !!!\n");
				return;
			}
		}
	};

	sw.start();

	multiply_single(arr_a, arr_b, arr_dst, N);

	time_ms = sw.get_time_milli();
	printf("single time: %f\n", time_ms);

	verify();

	multiply_4_wide(arr_a, arr_b, arr_dst, N);

	time_ms = sw.get_time_milli();
	printf("4 wide time: %f\n", time_ms);

	verify();
	fill_array(arr_dst, 0.0f, N);

	sw.start();

	multiply_8_wide(arr_a, arr_b, arr_dst, N);

	time_ms = sw.get_time_milli();
	printf("8 wide time: %f\n", time_ms);

	verify();

	free(arr_a);
	free(arr_b);
	free(arr_dst);
}


void fmadd_single(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		*dst = *a * *b + *c;
	}
}


void fmadd_4_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	__m128 wa;
	__m128 wb;
	__m128 wc;
	__m128 wdst;

	for (size_t i = 0; i < N; i += 4)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		wa = _mm_load_ps(a);
		wb = _mm_load_ps(b);
		wc = _mm_load_ps(c);

		wdst = _mm_fmadd_ps(wa, wb, wc);

		_mm_store_ps(dst, wdst);
	}
}


void fmadd_8_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	__m256 wa;
	__m256 wb;
	__m256 wc;
	__m256 wdst;

	for (size_t i = 0; i < N; i += 8)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		wa = _mm256_load_ps(a);
		wb = _mm256_load_ps(b);
		wc = _mm256_load_ps(c);

		wdst = _mm256_fmadd_ps(wa, wb, wc);

		_mm256_store_ps(dst, wdst);
	}
}


void fused_multiply_add()
{
	printf("\nFused Multiply-Add\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto arr_a = (r32*)malloc(N * sizeof(r32));
	auto arr_b = (r32*)malloc(N * sizeof(r32));
	auto arr_c = (r32*)malloc(N * sizeof(r32));
	auto arr_dst = (r32*)malloc(N * sizeof(r32));

	fill_array(arr_a, 3.0f, N);
	fill_array(arr_b, 2.0f, N);
	fill_array(arr_c, 1.0f, N);
	fill_array(arr_dst, 0.0f, N);

	auto const verify = [&]()
	{
		for (size_t i = 0; i < N; ++i)
		{
			if (arr_dst[i] != 7.0f)
			{
				printf("!!! fmadd error !!!\n");
				return;
			}
		}
	};

	sw.start();

	fmadd_single(arr_a, arr_b, arr_c, arr_dst, N);

	time_ms = sw.get_time_milli();
	printf("single time: %f\n", time_ms);

	verify();
	fill_array(arr_dst, 0.0f, N);

	sw.start();

	fmadd_4_wide(arr_a, arr_b, arr_c, arr_dst, N);

	time_ms = sw.get_time_milli();
	printf("4 wide time: %f\n", time_ms);

	verify();
	fill_array(arr_dst, 0.0f, N);

	sw.start();

	fmadd_8_wide(arr_a, arr_b, arr_c, arr_dst, N);

	time_ms = sw.get_time_milli();
	printf("8 wide time: %f\n", time_ms);

	verify();

	free(arr_a);
	free(arr_b);
	free(arr_c);
	free(arr_dst);
}


class FusedMultiplyAdd
{
public:
	r32 a = 2.0f;
	r32 b = 3.0f;
	r32 c = 1.0f;
	r32 dst = 0.0f;
};


class FusedMultplyAddSOA
{
public:
	std::vector<r32> vec_a;
	std::vector<r32> vec_b;
	std::vector<r32> vec_c;
	std::vector<r32> vec_dst;
};


void fmadd_array_of_structs()
{
	printf("\nFused Multiply-Add Array of Structs\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	std::vector<FusedMultiplyAdd> fmadd_list(N);
	auto struct_array = fmadd_list.data();

	sw.start();
	for (size_t i = 0; i < N; ++i)
	{
		auto s = struct_array + i;
		s->dst = s->a * s->b + s->c;
	}

	time_ms = sw.get_time_milli();
	printf("array of structs time: %f\n", time_ms);
}


void fmadd_struct_of_arrays()
{
	printf("\nFused Multiply-Add Struct of Arrays\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto const init_vec = [&](std::vector<r32>& vec, r32 val) 
	{
		vec.resize(N);
		std::fill(vec.begin(), vec.end(), val);
	};

	FusedMultplyAddSOA fmadd_soa;
	init_vec(fmadd_soa.vec_a, 2.0f);
	init_vec(fmadd_soa.vec_b, 3.0f);
	init_vec(fmadd_soa.vec_c, 1.0f);
	init_vec(fmadd_soa.vec_dst, 0.0f);

	auto arr_a = fmadd_soa.vec_a.data();
	auto arr_b = fmadd_soa.vec_b.data();
	auto arr_c = fmadd_soa.vec_c.data();
	auto arr_dst = fmadd_soa.vec_dst.data();

	sw.start();
	for (size_t i = 0; i < N; ++i)
	{
		arr_dst[i] = arr_a[i] * arr_b[i] + arr_c[i];
	}

	time_ms = sw.get_time_milli();
	printf("struct of arrays time: %f\n", time_ms);	
}




void run()
{
	multiply();
	fused_multiply_add();

	fmadd_array_of_structs();
	fmadd_struct_of_arrays();
}