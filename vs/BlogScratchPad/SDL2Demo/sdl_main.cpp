#define SDL_MAIN_HANDLED
#include <SDL2/SDL.h>

#include <cstdio>
#include <cstddef>
#include <thread>

#include "../util/stopwatch.hpp"

using u8 = uint8_t;
using u16 = uint16_t;
using u32 = uint32_t;
using u64 = uint64_t;

using i16 = int16_t;
using i32 = int32_t;
using i64 = int64_t;

using r32 = float;
using r64 = double;


constexpr auto WINDOW_TITLE = "Image Window";
constexpr int WINDOW_WIDTH = 800;
constexpr int WINDOW_HEIGHT = 800;

constexpr r64 TARGET_FRAMERATE_HZ = 60.0;
constexpr auto TARGET_MS_PER_FRAME = 1000.0 / TARGET_FRAMERATE_HZ;

static bool g_running = false;


void wait_for_framerate(Stopwatch& sw)
{
    auto frame_ms_elapsed = sw.get_time_milli();
    auto sleep_ms = (u32)(TARGET_MS_PER_FRAME - frame_ms_elapsed);
    if (frame_ms_elapsed < TARGET_MS_PER_FRAME && sleep_ms > 0)
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(sleep_ms));
        while (frame_ms_elapsed < TARGET_MS_PER_FRAME)
        {
            frame_ms_elapsed = sw.get_time_milli();
        }
    }
    else
    {
        printf("Missed framerate\n");
    }

    sw.start();
}






bool init_sdl()
{
    if (SDL_Init(SDL_INIT_VIDEO) != 0)
    {
        printf("SDL_Init failed\n%s\n", SDL_GetError());
        return false;
    }

    return true;
}


void cleanup()
{
    SDL_Quit();
}


SDL_Window* create_window()
{
    const char* title = "Image Window";
    int width = 800;
    int height = 800;

    auto window = SDL_CreateWindow(
        WINDOW_TITLE,
        SDL_WINDOWPOS_UNDEFINED,
        SDL_WINDOWPOS_UNDEFINED,
        WINDOW_WIDTH,
        WINDOW_HEIGHT,
        SDL_WINDOW_RESIZABLE);

    if (!window)
    {
        printf("SDL_CreateWindow failed\n%s\n", SDL_GetError());
    }

    return window;
}


int main(int argc, char* args[])
{
    printf("\n");

    if (!init_sdl())
    {
        return EXIT_FAILURE;
    }

    auto window = create_window();
    if (!window)
    {
        return EXIT_FAILURE;
    }

    g_running = true;
    Stopwatch sw;
    sw.start();

    // temp
    u32 temp_n_frames = (u32)(5000.0 / TARGET_MS_PER_FRAME); // keep app running for 5 seconds
    u32 temp_frame_count = 0;

    while (g_running)
    {
        wait_for_framerate(sw);

        // temp
        ++temp_frame_count;
        if (temp_frame_count >= temp_n_frames)
        {
            g_running = false;
        }
    }

    cleanup();
    return EXIT_SUCCESS;
}