# Node.js Win32 SetWindowBand

Use [Node.js][node] with [Frida][frida] to call `User32\SetWindowBand` from `explorer.exe`.

See <https://blog.adeltax.com/window-z-order-in-windows-10>.

## Instructions

Install [pnpm][pnpm], then run the following command in the [Terminal][wt] to install [Node.js][node]:

```sh
# Install the latest version of NodeJS.
pnpm env use latest --global
```

[Clone][clone] this repository to your local computer, open the root directory with [Visual Studio Code][vs].

Run the following command in the [VS Code Terminal][vt] to install all required dependencies:

```sh
# Install all dependencies for the project.
# It will take a while until Frida is compiled.
pnpm install
```

> [!NOTE]
> Install an older version of [Node.js][node] if [Frida][frida] does not compile.
> ```sh
> # List remotely available Node.js versions:
> pnpm env list --remote
>
> # For example, install v22 if the latest version is v23:
> pnpm env use 22.14.0 --global
>
> # This should trigger the compilation again.
> pnpm update frida
> ```

Run the following command in the [VS Code Terminal][vt] to start the script:

```sh
# Run "./src/index.js".
# HWND: A handle to the window.
# BAND: One of the ZBID values.
node . HWND BAND
```

<details>
<summary>Expand to view a table of ZBID values (window bands).</summary>

| Value | Name |
| :---: | --- |
| 0 | ZBID_DEFAULT |
| 1 | ZBID_DESKTOP |
| 2 | ZBID_UIACCESS |
| 3 | ZBID_IMMERSIVE_IHM |
| 4 | ZBID_IMMERSIVE_NOTIFICATION |
| 5 | ZBID_IMMERSIVE_APPCHROME |
| 6 | ZBID_IMMERSIVE_MOGO |
| 7 | ZBID_IMMERSIVE_EDGY |
| 8 | ZBID_IMMERSIVE_INACTIVEMOBODY |
| 9 | ZBID_IMMERSIVE_INACTIVEDOCK |
 10 | ZBID_IMMERSIVE_ACTIVEMOBODY ||
| 11 | ZBID_IMMERSIVE_ACTIVEDOCK |
| 12 | ZBID_IMMERSIVE_BACKGROUND |
| 13 | ZBID_IMMERSIVE_SEARCH |
| 14 | ZBID_GENUINE_WINDOWS |
| 15 | ZBID_IMMERSIVE_RESTRICTED |
| 16 | ZBID_SYSTEM_TOOLS |
| 17 | ZBID_LOCK |
| 18 | ZBID_ABOVELOCK_UX |

</details>

<!-- Reference Links -->
[node]: https://nodejs.org
[pnpm]: https://pnpm.io/installation
[frida]: https://frida.re

[vs]: https://code.visualstudio.com
[wt]: https://docs.microsoft.com/windows/terminal
[vt]: https://code.visualstudio.com/docs/terminal/basics

[clone]: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
