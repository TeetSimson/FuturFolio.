import React, { Component, useEffect, useState} from 'react'
//for the transition animation
import {CSSTransition} from 'react-transition-group';
//svg files for the icons used
import { ReactComponent as CogIcon } from './Icons/cogIcon.svg';
import { ReactComponent as RightChevron } from './Icons/chevronRight.svg';
import { ReactComponent as LeftChevron } from './Icons/chevronLeft.svg';
import { ReactComponent as PowerIcon } from './Icons/powerIcon.svg';
import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';
import { ReactComponent as AppearanceIcon } from './Icons/appearanceIcon.svg';
import { ReactComponent as LanguageIcon } from './Icons/languageIcon.svg';
import { ReactComponent as LocationIcon } from './Icons/locationIcon.svg';
import { ReactComponent as AdvancedIcon } from './Icons/advancedIcon.svg';

var name = "Elon Musk"; // A variable for profile name

export default function DropdownMenu(props){ //dropdownmenu function

    const [activeMenu, setActiveMenu] = useState('main'); //state of the menu
    const [menuHeight, setMenuHeight] = useState(null);




    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }


    function DropdownItem(props){ //Items nested in the function
        return(
            <a href="#" className="menu-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="icon-button">{props.leftIcon}</span>{/*Icon on the left*/}
                {props.children}

                <span className="icon-right">{props.rightIcon}</span>{/*Icon on the right*/}
                
            </a>
        );
    }

    function ProfileDropItem(props){ //Items nested in the function
        return(
            <a href="#" className="profdrop-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="profdrop-icon">{props.Icon}</span>{/*Profile Image*/}
                <span className="prof-name">{props.children} </span>              
            </a>
        );
    }


    function DropdownItemBack(props){//Items nested in the function
        return(
            <a href="#" className="menu-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="leftChevron">{props.leftIcon}</span>{/*Icon on the left*/}
                {props.children}

                <span className="icon-right">{props.rightIcon}</span>{/*Icon on the right*/}
                
            </a>
        );
    }

    function DropdownItemSingle(props){//Items nested in the function
        return(
            <a href="#" className="menu-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                
                {props.children}

                
                
            </a>
        );
    }

    return(
        <div className="dropdown" style={{height: menuHeight}}>
            {/*if activeMenu is main then show children*/}
            <CSSTransition 
              in={activeMenu === 'main'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-primary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    <ProfileDropItem //The top bit of the menu
                    Icon = {<ProfileIcon/>}
                    >
                        {name} {/* The profile's name */}
                    </ProfileDropItem>


                    {/*adds an item called My Profile*/}
                    <div onClick={props.DashChangeProfile}>
                        <DropdownItem 
                        leftIcon = {<ProfileIcon/>}
                        
                        >
                            My Profile
                        </DropdownItem>
                    </div>
                    {/*adds an item called Settings*/}
                    <DropdownItem
                    leftIcon={<CogIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="settings"
                    >
                        <p>{/*A lot of spaces for styling*/}
                            Settings &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                    </DropdownItem>

                    {/*adds an item called Log Out*/}
                    <DropdownItem
                    leftIcon={<PowerIcon />}
                    >
                        Log Out
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'settings'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-secondary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="main"  //takes back to main menu
                    >
                        Settings
                    </DropdownItemBack>
                    {/*adds an item called Appearance for personalisation*/}
                    <DropdownItem
                    leftIcon={<AppearanceIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="appearance" //goes to Appearance Menu
                    >
                        <p>Appearance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </DropdownItem>

                    <DropdownItem
                    leftIcon={<LanguageIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="language" //goes to Appearance Menu
                    >
                        <p>Language&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </DropdownItem>

                    <DropdownItem
                    leftIcon={<LocationIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="location" //goes to Appearance Menu
                    >
                        <p>Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </DropdownItem>
                    
                    <div onClick={props.DashChangeSettings}>
                    <DropdownItem
                    leftIcon={<AdvancedIcon />}
                    >
                        Advanced Settings
                    </DropdownItem>
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'appearance'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-tertiary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="settings"  //takes back to main menu
                    >
                        Appearance
                    </DropdownItemBack>

                    <DropdownItemSingle>
                        Light Mode
                    </DropdownItemSingle>

                    <DropdownItemSingle>
                        Dark Mode
                    </DropdownItemSingle>
                    
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'language'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-tertiary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="settings"  //takes back to main menu
                    >
                        Choose your language
                    </DropdownItemBack>

                    <DropdownItemSingle>
                        <select class= "drop-select" data-placeholder="Choose a Language...">
                            <option value="AF">Afrikaans</option>
                            <option value="SQ">Albanian</option>
                            <option value="AR">Arabic</option>
                            <option value="HY">Armenian</option>
                            <option value="EU">Basque</option>
                            <option value="BN">Bengali</option>
                            <option value="BG">Bulgarian</option>
                            <option value="CA">Catalan</option>
                            <option value="KM">Cambodian</option>
                            <option value="ZH">Chinese (Mandarin)</option>
                            <option value="HR">Croatian</option>
                            <option value="CS">Czech</option>
                            <option value="DA">Danish</option>
                            <option value="NL">Dutch</option>
                            <option value="EN">English</option>
                            <option value="ET">Estonian</option>
                            <option value="FJ">Fiji</option>
                            <option value="FI">Finnish</option>
                            <option value="FR">French</option>
                            <option value="KA">Georgian</option>
                            <option value="DE">German</option>
                            <option value="EL">Greek</option>
                            <option value="GU">Gujarati</option>
                            <option value="HE">Hebrew</option>
                            <option value="HI">Hindi</option>
                            <option value="HU">Hungarian</option>
                            <option value="IS">Icelandic</option>
                            <option value="ID">Indonesian</option>
                            <option value="GA">Irish</option>
                            <option value="IT">Italian</option>
                            <option value="JA">Japanese</option>
                            <option value="JW">Javanese</option>
                            <option value="KO">Korean</option>
                            <option value="LA">Latin</option>
                            <option value="LV">Latvian</option>
                            <option value="LT">Lithuanian</option>
                            <option value="MK">Macedonian</option>
                            <option value="MS">Malay</option>
                            <option value="ML">Malayalam</option>
                            <option value="MT">Maltese</option>
                            <option value="MI">Maori</option>
                            <option value="MR">Marathi</option>
                            <option value="MN">Mongolian</option>
                            <option value="NE">Nepali</option>
                            <option value="NO">Norwegian</option>
                            <option value="FA">Persian</option>
                            <option value="PL">Polish</option>
                            <option value="PT">Portuguese</option>
                            <option value="PA">Punjabi</option>
                            <option value="QU">Quechua</option>
                            <option value="RO">Romanian</option>
                            <option value="RU">Russian</option>
                            <option value="SM">Samoan</option>
                            <option value="SR">Serbian</option>
                            <option value="SK">Slovak</option>
                            <option value="SL">Slovenian</option>
                            <option value="ES">Spanish</option>
                            <option value="SW">Swahili</option>
                            <option value="SV">Swedish </option>
                            <option value="TA">Tamil</option>
                            <option value="TT">Tatar</option>
                            <option value="TE">Telugu</option>
                            <option value="TH">Thai</option>
                            <option value="BO">Tibetan</option>
                            <option value="TO">Tonga</option>
                            <option value="TR">Turkish</option>
                            <option value="UK">Ukrainian</option>
                            <option value="UR">Urdu</option>
                            <option value="UZ">Uzbek</option>
                            <option value="VI">Vietnamese</option>
                            <option value="CY">Welsh</option>
                            <option value="XH">Xhosa</option>
                        </select>
                    </DropdownItemSingle>
                    
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'location'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-tertiary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="settings"  //takes back to main menu
                    >
                        Choose your location
                    </DropdownItemBack>
                    
                    <DropdownItemSingle>
                        
                        <select class="drop-select" name="country">
                        <option value="Afganistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bonaire">Bonaire</option>
                        <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Canary Islands">Canary Islands</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Channel Islands">Channel Islands</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">Christmas Island</option>
                        <option value="Cocos Island">Cocos Island</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote DIvoire">Cote DIvoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Curaco">Curacao</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands">Falkland Islands</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">French Polynesia</option>
                        <option value="French Southern Ter">French Southern Ter</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Great Britain">Great Britain</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="India">India</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea North">Korea North</option>
                        <option value="Korea Sout">Korea South</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Midway Islands">Midway Islands</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Nambia">Nambia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherland Antilles">Netherland Antilles</option>
                        <option value="Netherlands">Netherlands (Holland, Europe)</option>
                        <option value="Nevis">Nevis</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau Island">Palau Island</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Phillipines">Philippines</option>
                        <option value="Pitcairn Island">Pitcairn Island</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Republic of Montenegro">Republic of Montenegro</option>
                        <option value="Republic of Serbia">Republic of Serbia</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="St Barthelemy">St Barthelemy</option>
                        <option value="St Eustatius">St Eustatius</option>
                        <option value="St Helena">St Helena</option>
                        <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                        <option value="St Lucia">St Lucia</option>
                        <option value="St Maarten">St Maarten</option>
                        <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                        <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa">Samoa</option>
                        <option value="Samoa American">Samoa American</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Erimates">United Arab Emirates</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Uraguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City State">Vatican City State</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                        <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                        <option value="Wake Island">Wake Island</option>
                        <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        
                    </DropdownItemSingle>
                    
                </div>
            </CSSTransition>
        </div>








    );



    
}
