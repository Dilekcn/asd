import React, { useState, useLayoutEffect } from "react";
import "./FrequentlyAskedQuestions.css";
import "./VideoModel.css";
import faqs from "./Faq";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

function FrequentlyAskedQuestions() {
    const [faqList, setFaqList] = useState(faqs);
	const [modal, setModal] = useState(false);
	const [videoLoading, setVideoLoading] = useState(true);

	const openModal = () => {
		setModal(!modal);
	};

	const spinner = () => {
		setVideoLoading(!videoLoading);
	};

    const deletFaq = (i) =>{
        let newFaqs = faqs;
        newFaqs.splice(i,1);
        setFaqList([...newFaqs]);
    };

   useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [faqList]);

	return (
		<div className="question_container">
			<div className="question_id">
				<span>FAQ</span>
				<span>How you doing ID</span>
			</div>
			<div className="question_title">
				<h1>Frequently Asked Questions</h1>
			</div>
			{faqList.map((faq, i) => {
				return (
					<div className="question_faq" key={i}>
						<div>{i + 1}</div>
						<div>
							<h3>{faq.question}</h3> <br />
							<p>{faq.answer}</p>
							<br />
							<div className="video_model">
								<span onClick={openModal}>
									{faq.link}
									{modal ? (
										<section className="modal__bg">
											<div className="modal__align">
												<div className="modal__content" modal={modal}>
													<IoCloseOutline
														className="modal__close"
														arial-label="Close modal"
														onClick={setModal}
													/>
													<div className="modal__video-align">
														{videoLoading ? (
															<div className="modal__spinner">
																<BiLoaderAlt
																	className="modal__spinner-style"
																	fadeIn="none"
																/>
															</div>
														) : null}
														<iframe
															className="modal__video-style"
															onLoad={spinner}
															loading="lazy"
															width="800"
															height="500"
															// src={faq.link}
															src="https://www.youtube.com/embed/S2bLMai0UaM"
															title="YouTube video player"
															frameBorder="0"
															allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
															allowfullscreen
														></iframe>
													</div>
												</div>
											</div>
										</section>
									) : null}
								</span>
							</div>
						</div>
						<div>
							<button className="question_del_button" onClick={()=>deletFaq(i)}>-</button>
						</div>
					</div>
    			);
			})}
		</div>
	);
}

export default FrequentlyAskedQuestions;