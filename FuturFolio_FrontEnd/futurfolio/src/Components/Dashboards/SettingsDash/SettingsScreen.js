import React, { Component, useState } from 'react'
import './SettingsDash.css'
import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';
import { ReactComponent as PasswordIcon } from './Icons/passwordIcon.svg';
import { ReactComponent as CloseIcon } from './Icons/closeIcon.svg';
import { ReactComponent as LanguageIcon } from './Icons/languageIcon.svg';
import { ReactComponent as LocationIcon } from './Icons/locationIcon.svg';
import { ReactComponent as CurrencyIcon } from './Icons/currencyIcon.svg';
import { ReactComponent as AppearanceIcon } from './Icons/appearanceIcon.svg';
import { ReactComponent as BackgroundIcon } from './Icons/backgroundIcon.svg';
import { ReactComponent as HelpIcon } from './Icons/helpIcon.svg';
import { ReactComponent as FAQIcon } from './Icons/faqIcon.svg';
import { ReactComponent as ContactIcon } from './Icons/contactIcon.svg';
import { ReactComponent as ReportIcon } from './Icons/reportIcon.svg';
import { ReactComponent as InfoIcon } from './Icons/infoIcon.svg';


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
                    tags: ["name", "account", "profile", "email"],
                    icon: <ProfileIcon/>
                },
                {
                    name: "Password",
                    description: "Change your password",
                    tags: ["password"],
                    icon: <PasswordIcon/>
                },
                {
                    name: "Close Account",
                    description: "Warning: Closing your account is irreversible",
                    tags: ["delete", "close", "remove"],
                    icon: <CloseIcon/>
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
                    tags: ["language"],
                    icon: <LanguageIcon/>
                },
                {
                    name: "Location",
                    description: "Change your location",
                    tags: ["location", "country"],
                    icon: <LocationIcon/>
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
                    tags: ["currency", "money"],
                    icon: <CurrencyIcon/>
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
                    tags: ["appearance", "theme"],
                    icon: <AppearanceIcon/>
                },
                {
                    name: "Background",
                    description: "Change the background of Futurfolio.",
                    tags: ["appearance", "background"],
                    icon: <BackgroundIcon/>
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
                    description: "Having trouble? Check here to see what could be going wrong",
                    tags: ["help", "problems"],
                    icon: <HelpIcon/>
                },
                {
                    name: "FAQ",
                    description: "View our frequently asked questions",
                    tags: ["help", "questions"],
                    icon: <FAQIcon/>
                },
                {
                    name: "Contact us",
                    description: "Contact our support team, offer limited to premium users",
                    tags: ["help", "contact", "support"],
                    icon: <ContactIcon/>
                },
                {
                    name: "Report an issue",
                    description: "Report whats not working well, so we can fix it",
                    tags: ["report", "problem", "issue"],
                    icon: <ReportIcon/>
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
                    tags: ["about", "Futurfolio"],
                    icon: <InfoIcon/>
                }
            ]
        },
    ];

    const[visibleOptions, setVisibleOptions] = useState(options);

    const onChange = (e) =>{
        e.preventDefault();
        const value = e.target.value; //the input of the search box

        if(value.trim().length === 0){
            setVisibleOptions(options);
            return;
        }

        const returnedItems=[];

        visibleOptions.forEach((option,index) => {
            const foundOptions=option.values.filter((item)=>{
                return (
                    item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1 
                    ||
                    item.description.toLocaleLowerCase().search(value.trim().toLocaleLowerCase()) !== -1
                    );
            });

            returnedItems[index]={
                header:{
                    name:option.header.name,
                },
                values:foundOptions,
            };
            if(option.header.name.toLocaleLowerCase().search(value.trim().toLocaleLowerCase()) !== -1){
                returnedItems[index]={
                    header:{
                        name:option.header.name,
                    },
                    values:options[index].values,
                };
            }
        });

        setVisibleOptions(returnedItems);
    };

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
                   <div className = "sett-item" key = {option.header.name}>
                        <h1>{option.header.name}</h1>
                        <div>
                            {option.values.map((value) => (
                            <div key={value.name}>
                                <ul className = "list">
                                    <li className = "sett-item">
                                        <div className = "sett-content">
                                            <h2>{value.name}</h2>
                                            <h4>{value.description}</h4>
                                        </div>          
                                        <div className = "SettIcon">
                                            {value.icon}
                                        </div>
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