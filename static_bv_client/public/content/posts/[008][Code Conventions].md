# Simple GUI
## Using SDL2

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
class MyStruct
{
public:

    int x;
    int y;
};

/*

typedef struct MyStruct_t
{
    int x;
    int y;
} MyStruct;

*/

```

```cpp

int* ptr;

//int *ptr;

```

namespaces
