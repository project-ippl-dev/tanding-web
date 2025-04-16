import React from "react";
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SearchBox() {
    return (
        <div className="relative w-full">
            <input 
                type="text" 
                placeholder="Search..." 
                className="w-full h-10 px-4 pr-17 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none bg-white"
            >
                <Button>
                    <Search />
                </Button>
            </div>
        </div>
    );
}