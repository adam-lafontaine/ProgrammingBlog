#define SDL_MAIN_HANDLED
#include <SDL2/SDL.h>

#include <cstdio>


constexpr auto WINDOW_TITLE = "Image Window";
constexpr int WINDOW_WIDTH = 800;
constexpr int WINDOW_HEIGHT = 800;


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


    cleanup();
}