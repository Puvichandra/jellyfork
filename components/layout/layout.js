import { Fragment } from "react";
import FooterComponent from "./footer-comp";
import MainHeader from "./main-header";
import Head from "next/head";
import Script from 'next/script'






function Layout(props){
    return    (
      <div>

    <div>
  <MainHeader/>
    <main className="bg-bodygray">
          {props.children}
    </main>
    <FooterComponent/> 
      </div>
      </div>
    );
    
}
export default Layout;
