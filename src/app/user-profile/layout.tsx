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
    const closeDrawer = () => {setOpenDrawer(false)}

    return(
        <div>
            <header>
                <NavBar setDrawer={setOpenDrawer}/>
                {/* {!isMdUp && <AppBarMobile setOpenDrawer={setOpenDrawer} />} */}
                {/* {<SideDrawer
                    drawerOpen = {openDrawer}
                    setDrawer={setOpenDrawer} 
                />} */}
            </header>
            <main>
                 {<SideDrawer
                    open={openDrawer}
                    closeDrawer={closeDrawer}
                ></SideDrawer>}
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}