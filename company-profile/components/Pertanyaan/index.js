import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import feature3 from "../../public/assets/img/about/2.jpg";
import Image from "next/image";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

class Pertanyaan extends Component {
  render() {
    return (
      <div className="faq-us-area  pt-120 pb-90">
				<div className="container">
					<div className="row">						
						<div className="col-xl-6 col-lg-6">
							<div className="about-img mb-30">
								{/* <img src={require('../../public/assets/img/about/2.jpg')} alt='image'/> */}
								<Image src={feature3} alt="imgs"/>
							</div>
						</div>
            <div className="col-xl-6  col-lg-6  col-md-6 ">
              <div className="question-collapse">
                <div className="faq-title">
                  <h1>
                    Pertanyaan Seputar SAO Herbal
                  </h1>
                </div>
                <div className="accordion-wrapper">
                  <Accordion className="accodion-style--1" preExpanded={"0"}>
                    <AccordionItem uuid="0">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <h5>Why Do You Eat Orange Food?</h5>
                          <i>
                            <FontAwesomeIcon icon={["fas", "chevron-down"]} style={{color: "#fff"}} />
                          </i>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          exea commodo consequat aute irure aliquam quaerat.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="1">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <h5>Why Orange Food Is The Best For Health?</h5>
                          <i>
                            <FontAwesomeIcon icon={["fas", "chevron-down"]} style={{color: "#fff"}} />
                          </i>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          exea commodo consequat aute irure aliquam quaerat.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="2">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <h5>Good Food For Good Health?</h5>
                          <i>
                            <FontAwesomeIcon icon={["fas", "chevron-down"]} style={{color: "#fff"}} />
                          </i>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          exea commodo consequat aute irure aliquam quaerat.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>          
					</div>
				</div>
			</div>     
    );
  }
}

export default Pertanyaan;
