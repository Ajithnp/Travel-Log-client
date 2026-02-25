# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


Toast usage:

import { useRichToast } from "@/components/RichToast";
const showToast = useRichToast();

onSuccess: () => showToast({ message: "Saved!", variant: "success" }),
nst handleSubmit = () => {
    // save data...
    navigate("/dashboard");
    showToast({
      message: "Profile updated successfully!",
      variant: "success",
      position: "top-right",
    });
  };

 showToast({
      message: "Saved successfully!",
      variant: "success",     // "success" | "error" | "warning" | "info"
      position: "top-right",  // 7 positions including "center"
      theme: "dark",          // "dark" | "light"
      duration: 4000,         // ms (optional)
      className: "",          // custom classes (optional)
    })}>
------------------------------------------------------------------

Skeleton using:

- You can match expected API page size:
Array.from({ length: PAGE_SIZE })

If you're using React Query:
- if (isLoading) return <PackageListSkeleton />

Create a wrapper:
- function PackageListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  )
}