#include "simd.hpp"
#include "../../../util/stopwatch.hpp"

#include <immintrin.h>
#include <xmmintrin.h>
#include <vector>
#include <cstdio>
#include <algorithm>


using r32 = float;
using r64 = double;


void multiply_single(r32* a, r32* b, r32* dst)
{
	*dst = *a * *b;
}


void multiply_4_wide(r32* a, r32* b, r32* dst)
{
	auto wa = _mm_load_ps(a);
	auto wb = _mm_load_ps(b);

	auto wdst = _mm_mul_ps(wa, wb);

	_mm_store_ps(dst, wdst);
}


void multiply_8_wide(r32* a, r32* b, r32* dst)
{
	auto wa = _mm256_load_ps(a);
	auto wb = _mm256_load_ps(b);

	auto wdst = _mm256_mul_ps(wa, wb);

	_mm256_store_ps(dst, wdst);
}


void multiply()
{
	printf("\nMultiply\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	std::vector<r32> vec_a(N, 2.0f);
	std::vector<r32> vec_b(N, 3.0f);
	std::vector<r32> vec_dst(N, 0.0f);

	auto const verify = [&]()
	{
		auto result = std::all_of(vec_dst.begin(), vec_dst.end(), [](r32 x) { return x == 6.0f; });
		if (!result)
		{
			printf("!!! multiplication error !!!\n");
		}
	};	

	sw.start();

	for (size_t i = 0; i < N; ++i)
	{
		auto a = vec_a.data() + i;
		auto b = vec_b.data() + i;
		auto dst = vec_dst.data() + i;

		multiply_single(a, b, dst);
	}

	time_ms = sw.get_time_milli();
	printf("single time: %f\n", time_ms);
	verify();

	std::fill(vec_dst.begin(), vec_dst.end(), 0.0f);
	sw.start();
	for (size_t i = 0; i < N; i += 4)
	{
		auto a = vec_a.data() + i;
		auto b = vec_b.data() + i;
		auto dst = vec_dst.data() + i;

		multiply_4_wide(a, b, dst);
	}

	time_ms = sw.get_time_milli();
	printf("4 wide time: %f\n", time_ms);
	verify();

	std::fill(vec_dst.begin(), vec_dst.end(), 0.0f);
	sw.start();
	for (size_t i = 0; i < N; i += 8)
	{
		auto a = vec_a.data() + i;
		auto b = vec_b.data() + i;
		auto dst = vec_dst.data() + i;

		multiply_8_wide(a, b, dst);
	}

	time_ms = sw.get_time_milli();
	printf("8 wide time: %f\n", time_ms);
	verify();
}


void fmadd_single(r32* a, r32* b, r32* c, r32* dst)
{
	*dst = *a * *b + *c;
}


void fmadd_4_wide(r32* a, r32* b, r32* c, r32* dst)
{
	auto wa = _mm_load_ps(a);
	auto wb = _mm_load_ps(b);
	auto wc = _mm_load_ps(c);

	auto wdst = _mm_fmadd_ps(wa, wb, wc);

	_mm_store_ps(dst, wdst);
}


void fmadd_8_wide(r32* a, r32* b, r32* c, r32* dst)
{
	auto wa = _mm256_load_ps(a);
	auto wb = _mm256_load_ps(b);
	auto wc = _mm256_load_ps(c);

	auto wdst = _mm256_fmadd_ps(wa, wb, wc);

	_mm256_store_ps(dst, wdst);
}


void fused_multiply_add()
{
	printf("\nFused Multiply-Add\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	std::vector<r32> vec_a(N, 2.0f);
	std::vector<r32> vec_b(N, 3.0f);
	std::vector<r32> vec_c(N, 1.0f);
	std::vector<r32> vec_dst(N, 0.0f);

	auto const verify = [&]()
	{
		auto result = std::all_of(vec_dst.begin(), vec_dst.end(), [](r32 x) { return x == 7.0f; });
		if (!result)
		{
			printf("!!! multiplication error !!!\n");
		}
	};	

	sw.start();

	for (size_t i = 0; i < N; ++i)
	{
		auto a = vec_a.data() + i;
		auto b = vec_b.data() + i;
		auto c = vec_c.data() + i;
		auto dst = vec_dst.data() + i;

		fmadd_single(a, b, c, dst);
	}

	time_ms = sw.get_time_milli();
	printf("single time: %f\n", time_ms);
	verify();

	std::fill(vec_dst.begin(), vec_dst.end(), 0.0f);
	sw.start();
	for (size_t i = 0; i < N; i += 4)
	{
		auto a = vec_a.data() + i;
		auto b = vec_b.data() + i;
		auto c = vec_c.data() + i;
		auto dst = vec_dst.data() + i;

		fmadd_4_wide(a, b, c, dst);
	}

	time_ms = sw.get_time_milli();
	printf("4 wide time: %f\n", time_ms);
	verify();

	std::fill(vec_dst.begin(), vec_dst.end(), 0.0f);
	sw.start();
	for (size_t i = 0; i < N; i += 8)
	{
		auto a = vec_a.data() + i;
		auto b = vec_b.data() + i;
		auto c = vec_c.data() + i;
		auto dst = vec_dst.data() + i;

		fmadd_8_wide(a, b, c, dst);
	}

	time_ms = sw.get_time_milli();
	printf("8 wide time: %f\n", time_ms);
	verify();
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
	//multiply();
	//fused_multiply_add();

	fmadd_array_of_structs();
	fmadd_struct_of_arrays();
}