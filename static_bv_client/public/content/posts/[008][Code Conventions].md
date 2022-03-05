# Simple GUI
## Using SDL2


### Install SDL2

https://vcpkg.io/en/getting-started.html

```
Powershell as administrator

.\vcpkg.exe integrate install

.\vcpkg.exe install sdl2

.\vcpkg.exe install sdl2:x64-windows
```

```
apt-get install libsdl2-dev libsdl2-dbg

sudo killall ibus-daemon
```

```cpp
#define SDL_MAIN_HANDLED
#include <SDL2/SDL.h>


int main(int argc, char* args[])
{

}
```

### Application Setup


```cpp
#include <cstdio>

bool init_sdl()
{
    if (SDL_Init(SDL_INIT_VIDEO) != 0)
    {
        printf("SDL_Init failed\n%s\n", SDL_GetError());
        return false;
    }

    return true;
}
```

```cpp
void cleanup()
{
    SDL_Quit();
}
```

### Warning - Memory leak

```cpp
int main(int argc, char* args[])
{
#if defined(_WIN32) && defined(_DEBUG)
    int dbgFlags = _CrtSetDbgFlag(_CRTDBG_REPORT_FLAG);
    dbgFlags |= _CRTDBG_CHECK_ALWAYS_DF;   // check block integrity
    dbgFlags |= _CRTDBG_DELAY_FREE_MEM_DF; // don't recycle memory
    dbgFlags |= _CRTDBG_LEAK_CHECK_DF;     // leak report on exit
    _CrtSetDbgFlag(dbgFlags);
#endif

    if (!init_sdl())
    {
        return EXIT_FAILURE;
    }

        cleanup();
    return EXIT_SUCCESS;
}
```

### Application Setup (continued)

```cpp
constexpr auto WINDOW_TITLE = "Image Window";
constexpr int WINDOW_WIDTH = 800;
constexpr int WINDOW_HEIGHT = 800;


SDL_Window* create_window()
{
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
```


```cpp
int main(int argc, char* args[])
{
    if (!init_sdl())
    {
        return EXIT_FAILURE;
    }

    auto window = create_window();
    if (!window)
    {
        return EXIT_FAILURE;
    }

    // TODO: Add program logic here

    cleanup();
    return EXIT_SUCCESS;
}
```

### Set Application Framerate

```cpp
#include <cstddef>

using u8 = uint8_t;
using u16 = uint16_t;
using u32 = uint32_t;
using u64 = uint64_t;

using i16 = int16_t;
using i32 = int32_t;
using i64 = int64_t;

using r32 = float;
using r64 = double;

```


```cpp
#include <thread>

#include "stopwatch.hpp"

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
```

```cpp
int main(int argc, char* args[])
{
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
        // TODO: Add program logic here

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
```


### Handle Keyboard Input

```cpp
void handle_keyboard_event(SDL_Event const& event)
{
    if (event.key.repeat || event.key.state != SDL_PRESSED)
    {
        return;
    }

    auto key_code = event.key.keysym.sym;
    switch (key_code)
    {
    case SDLK_a:
    {
        printf("A\n");
    } break;
    case SDLK_b:
    {
        printf("B\n");
    } break;
    case SDLK_c:
    {
        printf("C\n");
    } break;

    }
}
```

```cpp
void handle_sdl_event(SDL_Event const& event)
{
    switch (event.type)
    {
    case SDL_QUIT:
    {
        printf("SDL_QUIT\n");
        g_running = false;
    } break;
    case SDL_KEYDOWN:
    case SDL_KEYUP:
    {
        auto key_code = event.key.keysym.sym;
        auto alt = event.key.keysym.mod & KMOD_ALT;
        if (key_code == SDLK_F4 && alt)
        {
            printf("ALT F4\n");
            g_running = false;
        }
        else if (key_code == SDLK_ESCAPE)
        {
            printf("ESC\n");
            g_running = false;
        }
        else
        {
            handle_keyboard_event(event);
        }

    } break;

    }
}
```


```cpp
int main(int argc, char* args[])
{
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

    while (g_running)
    {
        SDL_Event event;
        if (SDL_PollEvent(&event))
        {
            handle_quit(event);
        }

        wait_for_framerate(sw);
    }

    cleanup();
    return EXIT_SUCCESS;
}
```


### Enable Rendering

```cpp
class WindowBuffer
{
public:

    SDL_Renderer* renderer;
    SDL_Texture* texture;
};
```


```cpp
bool init_window_buffer(WindowBuffer& buffer, SDL_Window* window)
{
    buffer.renderer = SDL_CreateRenderer(window, -1, 0);

    if (!buffer.renderer)
    {
        printf("SDL_CreateRenderer failed\n%s\n", SDL_GetError());
        return false;
    }

    buffer.texture = SDL_CreateTexture(
        buffer.renderer,
        SDL_PIXELFORMAT_ARGB8888,
        SDL_TEXTUREACCESS_STREAMING,
        WINDOW_WIDTH,
        WINDOW_HEIGHT);

    if (!buffer.texture)
    {
        printf("SDL_CreateTexture failed\n%s\n", SDL_GetError());
        return false;
    }

    return true;
}
```

```cpp
void destroy_window_buffer(WindowBuffer& buffer)
{
    if (buffer.texture)
    {
        SDL_DestroyTexture(buffer.texture);
    }

    if (buffer.renderer)
    {
        SDL_DestroyRenderer(buffer.renderer);
    }
}
```

```cpp
static WindowBuffer g_window_buffer;
```

```cpp
void cleanup()
{
    destroy_window_buffer(g_window_buffer);
    SDL_Quit();
}
```


```cpp
int main(int argc, char* args[])
{
    if (!init_sdl())
    {
        return EXIT_FAILURE;
    }

    auto window = create_window();
    if (!window)
    {
        return EXIT_FAILURE;
    }

    if (!init_window_buffer(g_window_buffer, window))
    {
        cleanup();
        return EXIT_FAILURE;
    }

    g_running = true;
    Stopwatch sw;
    sw.start();

    while (g_running)
    {
        SDL_Event event;
        if (SDL_PollEvent(&event))
        {
            handle_sdl_event(event);
        }

        wait_for_framerate(sw);
    }

    cleanup();
    return EXIT_SUCCESS;
}
```


### Setup the image data


```cpp
class Pixel
{
public:
    u8 red;
    u8 green;
    u8 blue;
    u8 alpha; // padding
};


class Image
{
public:
    u32 width;
    u32 height;

    Pixel* data;
};


bool create_image(Image& image, u32 width, u32 height)
{
    image.width = width;
    image.height = height;
    image.data = (Pixel*)malloc(sizeof(Pixel) * width * height);

    if (!image.data)
    {
        return false;
    }

    return true;
}


void destroy_image(Image& image)
{
    if (image.data != nullptr)
    {
        free(image.data);
        image.data = nullptr;
    }
}


Pixel to_pixel(u8 r, u8 g, u8 b)
{
    Pixel p{};

    p.red = r;
    p.green = g;
    p.blue = b;
    p.alpha = 255;

    return p;
}
```

```cpp
constexpr u32 IMAGE_WIDTH = WINDOW_WIDTH;
constexpr u32 IMAGE_HEIGHT = WINDOW_HEIGHT;

static Image g_image;
```


```cpp
void cleanup()
{
    destroy_window_buffer(g_window_buffer);
    SDL_Quit();
    destroy_image(g_image);
}
```

```cpp
int main(int argc, char* args[])
{
    if (!init_sdl())
    {
        return EXIT_FAILURE;
    }

    auto window = create_window();
    if (!window)
    {
        return EXIT_FAILURE;
    }

    if (!init_window_buffer(g_window_buffer, window))
    {
        cleanup();
        return EXIT_FAILURE;
    }

    if (!create_image(g_image, IMAGE_WIDTH, IMAGE_HEIGHT))
    {
        cleanup();
        return EXIT_FAILURE;
    }

    g_running = true;
    Stopwatch sw;
    sw.start();

    while (g_running)
    {
        SDL_Event event;
        if (SDL_PollEvent(&event))
        {
            handle_sdl_event(event);
        }

        wait_for_framerate(sw);
    }

    cleanup();
    return EXIT_SUCCESS;
}
```

### Rendering


```cpp
void display_image(Image const& image, WindowBuffer const& buffer)
{
    auto pitch = (int)(image.width * sizeof(Pixel));
    auto error = SDL_UpdateTexture(buffer.texture, 0, image.data, pitch);
    if (error)
    {
        printf("SDL_UpdateTexture failed %s\n", SDL_GetError());
        return;
    }

    SDL_RenderCopy(buffer.renderer, buffer.texture, 0, 0);

    SDL_RenderPresent(buffer.renderer);
}
```

```cpp
void render_color(Pixel p)
{
    for (u32 i = 0; i < g_image.width * g_image.height; ++i)
    {
        g_image.data[i] = p;
    }

    display_image(g_image, g_window_buffer);
}
```


```cpp
void handle_keyboard_event(SDL_Event const& event)
{
    if (event.key.repeat || event.key.state != SDL_PRESSED)
    {
        return;
    }

    auto key_code = event.key.keysym.sym;
    switch (key_code)
    {
    case SDLK_a:
    {
        printf("A\n");

        render_color(to_pixel(255, 0, 0));
    } break;
    case SDLK_b:
    {
        printf("B\n");

        render_color(to_pixel(0, 255, 0));
    } break;
    case SDLK_c:
    {
        printf("C\n");

        render_color(to_pixel(0, 0, 255));
    } break;

    }
}
```