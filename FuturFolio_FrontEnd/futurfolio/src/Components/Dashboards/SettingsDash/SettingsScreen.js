import React, { Component, useState } from 'react'
import './SettingsDash.css'

export default function SettingsScreen(){
    const options = [
        {
            header: {
                name: "Account",
            },
    
            values:[
                {
                    name: "Profile",
                    description: "Edit your profile settings",
                    tags: ["name", "account", "profile", "email"]
                },
                {
                    name: "Password",
                    description: "Change your password",
                    tags: ["password"]
                },
                {
                    name: "Close Account",
                    description: "Warning: Closing your account is irreversible",
                    tags: ["delete", "close", "remove"]
                },
            ]
        },
    
        {
            header: {
                name: "Language & Location",
            },
    
            values:[
                {
                    name: "Language",
                    description: "Change your language",
                    tags: ["language"]
                },
                {
                    name: "Location",
                    description: "Change your location",
                    tags: ["location", "country"]
                },
            ]
        },
    
        {
            header: {
                name: "Currency",
            },
    
            values:[
                {
                    name: "Currency Settings",
                    description: "Change which currency you want to view",
                    tags: ["currency", "money"]
                }
            ]
        },
    
        {
            header: {
                name: "Appearance",
            },
    
            values:[
                {
                    name: "Theme",
                    description: "Change the theme of Futurfolio.",
                    tags: ["appearance", "theme"]
                },
                {
                    name: "Background",
                    description: "Change the background of Futurfolio.",
                    tags: ["appearance", "background"]
                }
            ]
        },
    
        {
            header: {
                name: "Support",
            },
    
            values:[
                {
                    name: "Help",
                    description: "Having trouble",
                    tags: ["help", "problems"]
                },
                {
                    name: "FAQ",
                    description: "View our frequently asked questions",
                    tags: ["help", "questions"]
                },
                {
                    name: "Contact us",
                    description: "Contact our support team, offer limited to premium users",
                    tags: ["help", "contact", "support"]
                },
                {
                    name: "Report an issue",
                    description: "Report whats not working well, so we can fix it",
                    tags: ["report", "problem", "issue"]
                },
    
            ]
        },
    
        {
            header: {
                name: "About us",
            },
    
            values:[
                {
                    name: "Information",
                    description: "Information of Futurfolio.",
                    tags: ["about", "Futurfolio"]
                }
            ]
        },
    ];

    const[visibleOptions, setVisibleOptions] = useState(options);

    const onChange = (e) =>{
        e.preventDefault();
        const value = e.target.value; //the input of the search box

        console.log("value",value);

        if(value.trim().length === 0){
            setVisibleOptions(options);
        }

        const returnedItems=[];

        visibleOptions.forEach((option,index) => {
            const foundOptions=option.values.filter((item)=>{
                return (
                    item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1);

            });
            returnedItems[index]={
                header:{
                    name:option.header.name,
                },
                values:foundOptions,
            };
        });

        setVisibleOptions(returnedItems);
    }

    return (
        <div className = "AppSettings">
            <div>
               <input 
                 type = "text" 
                 className="SearchInput" 
                 onChange={onChange}
                 placeholder = "Search..."
               />
               <div>
                   {visibleOptions.map((option) => (
                   <div key = {option.header.name}>
                        <h1>{option.header.name}</h1>
                        <div>
                            {option.values.map((value) => (
                            <div key={value.name}>
                                <ul className = "list">
                                    <li>
                                        <h4>{value.name}</h4>
                                        <p>{value.description}</p>
                                    </li>
                                </ul>
                            </div>
                            ))}
                        </div>
                   </div>
                   ))}
               </div>
            </div>
        </div>
    );
}