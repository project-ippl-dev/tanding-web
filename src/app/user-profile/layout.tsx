"use client"
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SideDrawer from "../components/Drawer";


export default function MainLayout({
    children
}: {
    children: React.ReactNode
}){
  
  const [openDrawer, setOpenDrawer] = useState(false)

    return(
        <div>
            <header>
                <NavBar setDrawer={setOpenDrawer}/>
                {/* {!isMdUp && <AppBarMobile setOpenDrawer={setOpenDrawer} />} */}
                <SideDrawer 
                    drawerProps={{
                        open: openDrawer,
                        setDrawer: setOpenDrawer}
                    }
                />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />  
            </footer>
        </div>
    )
}