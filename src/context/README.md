# Rencana Pengguna

## Cara Membuat React Context Baru

1. **Buat File Context Baru**  
   Buat file baru untuk konteks Anda, misalnya `example.context.tsx`. Gunakan `createContext` dari React untuk membuat konteks baru. Berikut adalah contoh dasar:

   ```tsx
   import React, { createContext, useContext } from "react";

   // Buat konteks baru
   const ExampleContext = createContext({});

   // Buat provider untuk konteks
   export function ExampleProvider({ children }: { children: React.ReactNode }) {
     const exampleValue = { key: "value" }; // Nilai yang akan disediakan oleh konteks
     return (
       <ExampleContext.Provider value={exampleValue}>
         {children}
       </ExampleContext.Provider>
     );
   }

   // Hook untuk menggunakan konteks
   export const useExample = () => useContext(ExampleContext);
   ```

2. **Tambahkan Provider ke Wrapper**  
   Gunakan provider yang telah dibuat di file `wrapper.tsx` untuk membungkus aplikasi Anda. Berikut adalah contohnya:

   ```tsx
   import React from "react";
   import { ExampleProvider } from "@/context/example.context";

   export default function WrapperContext({ children }: { children: React.ReactNode }) {
     return (
       <ExampleProvider>
         {children}
       </ExampleProvider>
     );
   }
   ```

## Cara Menggunakan Context dalam Komponen

Setelah context dibuat dan provider ditambahkan ke aplikasi, Anda dapat menggunakan context di dalam komponen mana pun yang berada dalam cakupan provider. Berikut adalah langkah-langkahnya:

1. **Import Hook Context**  
   Import hook context yang telah dibuat ke dalam komponen Anda.

   ```tsx
   import { useExample } from "@/context/example.context";
   ```

2. **Gunakan Hook dalam Komponen**  
   Panggil hook di dalam komponen untuk mengakses nilai dari context.

   ```tsx
   import React from "react";
   import { useExample } from "@/context/example.context";

   export default function ExampleComponent() {
     const exampleContext = useExample();

     return (
       <div>
         <h1>Example Context</h1>
         <p>Key: {exampleContext.key}</p>
       </div>
     );
   }
   ```

3. **Pastikan Komponen Berada dalam Cakupan Provider**  
   Pastikan komponen yang menggunakan context berada dalam cakupan provider. Jika tidak, Anda akan mendapatkan error karena context tidak tersedia.

   ```tsx
   import React from "react";
   import WrapperContext from "@/app/wrapper";
   import ExampleComponent from "@/components/ExampleComponent";

   export default function App() {
     return (
       <WrapperContext>
         <ExampleComponent />
       </WrapperContext>
     );
   }
   ```

## Contoh pada `auth.context.tsx`

Pada file `auth.context.tsx`, konteks dibuat untuk menyediakan data autentikasi (`AUTH_DATA`) ke seluruh aplikasi:

```tsx
import { AUTH_DATA } from "@/store/auth";
import React, { createContext, useContext } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={AUTH_DATA}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

## Penggunaan dalam `wrapper.tsx`

Konteks `AuthProvider` digunakan di file `wrapper.tsx` untuk membungkus aplikasi dengan data autentikasi:

```tsx
import { AuthProvider } from "@/context/auth.context";
import React from "react";

export default function WrapperContext({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

Dengan cara ini, data autentikasi tersedia di seluruh aplikasi melalui hook `useAuth`.