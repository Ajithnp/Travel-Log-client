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
//=====================================================
REact query no cache:


export const useUsersFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string
) => {
  return useQuery({
    queryKey: ["users", { page, limit, search, selectedFilter }],
    queryFn: () => getUsers(page, limit, search, selectedFilter),
    cacheTime: 0,          // 👈 cache is destroyed immediately
    staleTime: 0,          // 👈 always considered stale
    refetchOnWindowFocus: false,
  });
};

//===================================================

//========================================
Glacier modal Usage:

          <GlacierModal
            type="success"
            triggerLabel="View Success Modal"
            title="Transaction completed!"
            description="Your swap of 1.25 ETH to 4,200 USDT was successful via Uniswap Protocol."
            primaryAction={{ label: "New Trade", onClick: () => console.log("New trade") }}
            secondaryAction={{ label: "See Details", onClick: () => console.log("Details") }}
          />

          <GlacierModal
            type="pending"
            triggerLabel="View Pending Modal"
            title="Transaction pending..."
            description="Your transaction is taking longer than expected. Please wait while we process it."
            secondaryAction={{ label: "See Details", onClick: () => console.log("Details") }}
          />

          <GlacierModal
            type="error"
            triggerLabel="View Error Modal"
            title="Whoops! Something went wrong"
            description="Try again or contact Chat Support if you need additional help with your order."
            secondaryAction={{ label: "Back", onClick: () => console.log("Back") }}
          />

          <GlacierModal
            type="warning"
            triggerLabel="View Warning Modal"
            title="High fees detected"
            description="This order will cost $45.65 in gas fees. Are you sure you want to proceed?"
            primaryAction={{ label: "Continue", onClick: () => console.log("Continue") }}
            secondaryAction={{ label: "Use Limit Order", onClick: () => console.log("Limit") }}
          />
//======================================




