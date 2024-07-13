{/* <div className="seller-Ads-deal">
                    
                            {
                                plans.reverse().map((item, index) => 
                                    index === 0
                                    ?
                                    <div id='activePack' className="plan" key={index}>
                                        <div className="inner">
                                            <span className="pricing">
                                                <span>
                                                &#8358;{item.price} <small>/ m</small>
                                                </span>
                                            </span>
                                            <p className="title">{item.title}</p>
                                            <p className="info">{item.description}</p>
                                            <ul className="features">
                                                {
                                                    item.features.map((item) => 
                                                        <li>
                                                            <span className="icon">
                                                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                                                    <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                                </svg>
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className="action">
                                            <button data-package={item.package} onClick={e => {
                                                e.preventDefault(); 
                                                setProductPackage(e.target.dataset.package);
                                                let topElem = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
                                                let pElem = e.currentTarget.parentElement.parentElement.parentElement;

                                                let activePack = [...topElem.children].filter(item => item.hasAttribute('id'));
                                                console.log(topElem)

                                                activePack[0].removeAttribute('id')
                                                pElem.setAttribute('id', 'activePack');

                                            }} className="button" href="#">
                                                Choose plan
                                            </button>
                                            </div>
                                        </div>
                                    </div>  
                                    
                                    :

                                    <div className="plan" key={index}>
                                        <div className="inner">
                                            <span className="pricing">
                                                <span>
                                                &#8358;{item.price} <small>/ m</small>
                                                </span>
                                            </span>
                                            <p className="title">{item.title}</p>
                                            <p className="info">{item.description}</p>
                                            <ul className="features">
                                                {
                                                    item.features.map((item) => 
                                                        <li>
                                                            <span className="icon">
                                                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                                                    <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                                </svg>
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className="action">
                                            <button data-package={item.package} onClick={e => {
                                                e.preventDefault(); 
                                                setProductPackage(e.target.dataset.package);
                                                let topElem = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
                                                let pElem = e.currentTarget.parentElement.parentElement.parentElement;

                                                let activePack = [...topElem.children].filter(item => item.hasAttribute('id'));
                                                console.log(topElem)

                                                activePack[0].removeAttribute('id')
                                                pElem.setAttribute('id', 'activePack');

                                            }} className="button" href="#">
                                                Choose plan
                                            </button>
                                            </div>
                                        </div>
                                    </div>  
                                    
                                )
                            }

                        </div> */}