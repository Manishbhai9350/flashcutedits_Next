'use client';
import '@/app/index.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef , useEffect} from 'react';
const Nav = () => {
  const IsMobileNavOpen =useRef(false)
  const ServiceItems = useRef([]);
  const ServiceHeight = useRef(52)
  const ContainerHeight = useRef(0)
  const ServiceContentHeight  = useRef(0)
  const ServiceCon = useRef(null)
  const ServiceContent = useRef(null)
  const GraphicDesignCon = useRef(null)
  const ContentHeight = useRef(0)
  const ServiceChildHeights = useRef([])
  
  const pathname = usePathname();
  const CurrentPath = useRef(pathname);



  function CloseGraphics() {
    GraphicDesignCon.current.setAttribute("closed", "true");
    gsap.to(GraphicDesignCon.current.querySelector(".drop-down"), {
      rotate: 0,
    });
    gsap.to(GraphicDesignCon.current, {
      height: ContentHeight.current,
    });
  }

  function CloseServices() {
    ServiceItems.current.forEach((Item) => {
      gsap.to(Item, {
        height: ServiceHeight.current,
      });
      gsap.to(Item.querySelector(".drop-down"), {
        rotate: 0,
      });
      Item.setAttribute("closed", "true");
    });
    ContainerHeight.current = ServiceContentHeight.current;
    ServiceCon.current.setAttribute("closed", "true");
    gsap.to(ServiceContent.current.querySelector(".drop-down"), {
      rotate: 0,
    });
    gsap.to(ServiceCon.current, {
      height: ContainerHeight.current,
    });
  }
  
  function OpenNav() {
    IsMobileNavOpen.current = true;
    gsap.killTweensOf([
      ".mobile-nav-items",
      ".hamburger .line:first-child",
      ".hamburger .line:last-child",
    ]);
    gsap.to(".hamburger", {
      gap: 0,
    });
    gsap.to(".hamburger .line:first-child", {
      rotate: 45,
    });
    gsap.to(".hamburger .line:last-child", {
      rotate: -45,
    });
    gsap.to(".mobile-nav-items", {
      display: "flex",
      opacity: 1,
    });
  }

  function CloseNav() {
    IsMobileNavOpen.current = false;
    gsap.killTweensOf([
      ".mobile-nav-items",
      ".hamburger .line:first-child",
      ".hamburger .line:last-child",
    ]);
    CloseServices();
    CloseGraphics();
    gsap.to(".hamburger", {
      gap: 15,
    });
    gsap.to(".hamburger .line:first-child", {
      rotate: 0,
    });
    gsap.to(".hamburger .line:last-child", {
      rotate: 0,
    });
    gsap.to(".mobile-nav-items", {
      opacity: 0,
      onComplete() {
        gsap.set(".mobile-nav-items", {
          display: "none",
        });
      },
    });
  }

  useGSAP(() => {
    const Hamburger = document.querySelector(".hamburger");

    const HamburgerListener =  () => {
      if (!IsMobileNavOpen.current) {
        OpenNav();
      } else {
        CloseNav();
      }
    }

    const ScrollListener = () => {
      if (IsMobileNavOpen.current) {
        CloseNav();
      }
    }

    Hamburger.addEventListener("click",HamburgerListener);

    window.addEventListener("scroll", ScrollListener);

    // GraphicDesignCon.current = document.querySelector(
    //   ".mobile-nav .item.graphic"
    // );
    const GraphicContent = GraphicDesignCon.current.querySelector(".item-content");
    const GraphicData = GraphicDesignCon.current.querySelector(".item-data");

    let DataHeight = 110;
    ContentHeight.current = 50;

    

    const GraphicListener = () => {
      const IsClosed = GraphicDesignCon.current.getAttribute("closed") == "true";
      GraphicDesignCon.current.setAttribute("closed", !IsClosed);
      if (IsClosed) {
        gsap.to(GraphicDesignCon.current.querySelector(".drop-down"), {
          rotate: 180,
        });
        DataHeight = document
          .querySelector(".item.graphic")
          .querySelector(".item-data")
          .getBoundingClientRect().height;
        gsap.to(GraphicDesignCon.current, {
          height: ContentHeight.current + DataHeight,
        });
      } else {
        CloseGraphics();
      }
    }

    GraphicContent.addEventListener("click",GraphicListener);

    ServiceContent.current = ServiceCon.current.querySelector(".item-content");
    const ServiceItemsCon = ServiceCon.current.querySelector(".item-data");
    ServiceItems.current = ServiceCon.current.querySelectorAll('.item')

    ServiceContentHeight.current = 56;
    let ListenerAdded = false;
    ContainerHeight.current = ServiceContentHeight.current;
    let MaxHeight = 0;
    

    function AddLister() {
      ServiceItems.current.forEach((Item, idx) => {
        const ItemContent = Item.querySelector(".item-content");
        const Child = Item.querySelector(".item-data");
        ItemContent.addEventListener("click", () => {
          let IsClosed = Item.getAttribute("closed") == "true";
          Item.setAttribute("closed", !IsClosed);
          if (!IsClosed) {
            gsap.to(Item, {
              height: ServiceChildHeights.current[idx].closed,
            });
            gsap.to(Item.querySelector(".drop-down"), {
              rotate: 0,
            });
            CompressService(idx);
          } else {
            gsap.to(Item, {
              height: ServiceChildHeights.current[idx].total,
            });
            gsap.to(Item.querySelector(".drop-down"), {
              rotate: 180,
            });
            ExpandService(idx);
          }
        });
      });
      ListenerAdded = true;
    }

    
    function ExpandService(idx) {
      gsap.to(ServiceCon.current, {
        height:
          ServiceCon.current.getBoundingClientRect().height +
          ServiceChildHeights.current[idx].items,
      });
    }

    function CompressService(idx) {
      gsap.to(ServiceCon.current, {
        height:
          ServiceCon.current.getBoundingClientRect().height -
          ServiceChildHeights.current[idx].items,
      });
    }

    function OpenService() {
      ServiceChildHeights.current = [];
      ServiceItems.current.forEach((Item) => {
        const Child = Item.querySelector(".item-data");
        const ItemRect =
          Item.querySelector(".item-content").getBoundingClientRect();
        const ChildRect = Child.getBoundingClientRect();
        const ItemObj = {
          closed: ItemRect.height,
          total: ItemRect.height + ChildRect.height,
          items: ChildRect.height,
        };
        ServiceChildHeights.current.push(ItemObj);
      });
      ContainerHeight.current += ServiceChildHeights.current.reduce(
        (Prev, Item) => Prev + Item.closed,
        0
      );
      gsap.to(ServiceContent.current.querySelector(".drop-down"), {
        rotate: 180,
      });
      gsap.to(ServiceCon.current, {
        height: ContainerHeight.current,
      });
      if (!ListenerAdded) {
        AddLister();
      }
    }

    const ServiceListener = () => {
      const IsClosed = ServiceCon.current.getAttribute("closed") == "true";
      ServiceCon.current.setAttribute("closed", !IsClosed);
      if (IsClosed) {
        OpenService();
      } else {
        CloseServices();
      }
    }

    ServiceContent.current.addEventListener("click", ServiceListener);
    return () => {
      CloseNav();
      ServiceContent.current.removeEventListener('click',ServiceListener)
    };
  },[]);

  
  useEffect(() => {
    if (pathname === CurrentPath.current) return;
    CurrentPath.current = pathname;
    CloseNav();
  }, [pathname]);

  return (
    <>
      <div className="mobile-nav">
        <div className="logo">
          <a  href="/">
            <Image fill src="/logo/flash_cut_white.png" alt="Logo" />
          </a>
        </div>
        <div className="hamburger">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="mobile-nav-items">
          <a href="/" className="nav-a nav-link ">
            Home
          </a>
          <div closed="true" ref={ServiceCon} className="services item">
            <div ref={ServiceContent} className="item-content">
              <h2 className="nav-a nav-link ">Services</h2>
              <div className="drop-down"></div>
            </div>
            <div className="item-data">
              <div closed="true" className="item">
                <div className="item-content">
                  <div className="text">
                    <h2>Basic Editing</h2>
                    <p className="courier">
                      &nbsp;&nbsp;( 2+ Years Experienced Editors )
                    </p>
                  </div>
                  <div className="drop-down"></div>
                </div>
                <div className="item-data">
                  <div className="item-data-child">
                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/podcast"
                      >
                        1 Podcasts Editing
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/business"
                      >
                        2 Business ADS
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/gym"
                      >
                        3 GYM Edits
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/cinemtic"
                      >
                        4 Cinematic Edits
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/faceless"
                      >
                        5 Faceless Edits
                      </a>
                    </div>
                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/health"
                      >
                        6 Health Edits
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/tech"
                      >
                        7 Tech Reels
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/gaming"
                      >
                        8 Gaming Reels
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/interview"
                      >
                        9 Interview Reels
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/basic/education"
                      >
                        10 Education Reels
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div closed="true" className="item">
                <div className="item-content">
                  <div className="text">
                    <h2>Advance Editing</h2>
                    <p>&nbsp;&nbsp;( 4-6 Years Experienced Editors )</p>
                  </div>
                  <div className="drop-down"></div>
                </div>
                <div className="item-data">
                <div className="item-data-child">
                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/podcast"
                      >
                        1 Podcasts Editing
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/business"
                      >
                        2 Business ADS
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/gym"
                      >
                        3 GYM Edits
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/cinematic"
                      >
                        4 Cinematic Edits
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/faceless"
                      >
                        5 Faceless Edits
                      </a>
                    </div>
                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/health"
                      >
                        6 Health Edits
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/tech"
                      >
                        7 Tech Reels
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/gaming"
                      >
                        8 Gaming Reels
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/interview"
                      >
                        9 Interview Reels
                      </a>
                    </div>

                    <div className="data-child">
                      <a
                        className='page-redirect'
                        href="/work/editing/advance/education"
                      >
                        10 Education Reels
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div closed="true" ref={GraphicDesignCon} className="graphic item">
            <div className="item-content">
              <h2 className="nav-a nav-link">Graphic Design</h2>
              <div className="drop-down"></div>
            </div>
            <div className="item-data">
              <div className="item-data-child">
                <div className="data-child">
                  <a
                    href='/work/thumbnail/documentary'
                    
                  >
                    1 Documentary Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/education'
                    
                  >
                    2 Education Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/fitness'
                    
                  >
                    3 Fitness Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/gaming'
                    
                  >
                    4 Gaming Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/podcast'
                    
                  >
                    5 Podcast Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/tech'
                    
                  >
                    6 Tech Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/trading'
                    
                  >
                    7 Trading Thumbnails
                  </a>
                </div>

                <div className="data-child">
                  <a
                    href='/work/thumbnail/vlog'
                    
                  >
                    8 Vlog Thumbnails
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a href="/#about-section" className="nav-a nav-link ">
            About
          </a>
          <a className="nav-a nav-link">Contact</a>
        </div>
      </div>
      <nav>
        <div className="logo">
          <a href="/">
            <div className="icon">
              <Image fill src="/logo/flash_cut_white.png" alt="" />
            </div>
          </a>
        </div>
        <div className="items">
          <div className="nav-item courier">
            <div className="line-con">
              <div className="line"></div>
              <a href="/">Home</a>
            </div>
          </div>
          <div className="nav-item courier sub-child-opener-con">
            <div className="sub-child-con">
              <div className="sub-child line-con">
                <div
                  style={{ borderTop: "none" }}
                  className="sub-child-con-sub"
                >
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/podcast"
                    >
                      Podcasts
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/business"
                    >
                      Business ADS
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/gym"
                    >
                      GYM Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/cinematic"
                    >
                      Cinematic Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/faceless"
                    >
                      Faceless Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/health"
                    >
                      Health Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a className='page-redirect'
                      href="/work/editing/basic/tech"
                    >
                      Tech Reels
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/gaming"
                    >
                      Gaming Reels
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/interview"
                    >
                      Interview Reels
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      className='page-redirect'
                      href="/work/editing/basic/education"
                    >
                      Education Reels
                    </a>
                  </div>
                </div>
                <div className="line"></div>
                <p >Basic Editing</p>
              </div>
              <div className="sub-child line-con">
                <div className="sub-child-con-sub">
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/podcast'
                      className='page-redirect'
                    >
                      Podcasts
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/business'
                      className='page-redirect'
                    >
                      Business ADS
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/gym'
                      className='page-redirect'
                    >
                      GYM Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/cinematic'
                      className='page-redirect'
                    >
                      Cinematic Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/faceless'
                      className='page-redirect'
                    >
                      Faceless Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/health'
                      className='page-redirect'
                    >
                      Health Edits
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/tech'
                      className='page-redirect'
                    >
                      Tech Reels
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/gaming'
                      className='page-redirect'
                    >
                      Gaming Reels
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/interview'
                      className='page-redirect'
                    >
                      Interview Reels
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/editing/advance/education'
                      className='page-redirect'
                    >
                      Education Reels
                    </a>
                  </div>
                </div>
                <div className="line"></div>
                <a href="#">Advanced Editing</a>
              </div>
            </div>
            <p className="sub-child-opener">
              Services
            </p>
          </div>
          <div className="nav-item courier sub-child-opener-con">
            <div className="sub-child-con graphic-sub-con">
              <div className="sub-child line-con">
                <div
                  style={{ borderTop: "none" }}
                  className="sub-child-con-sub"
                >
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/documentary'
                      className='page-redirect'
                    >
                      Documentary
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/education'
                      className='page-redirect'
                    >
                      Education
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/fitness'
                      className='page-redirect'
                    >
                      Fitness
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/gaming'
                      className='page-redirect'
                    >
                      Gaming
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/podcast'
                      className='page-redirect'
                    >
                      Podcast
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/tech'
                      className='page-redirect'
                    >
                      Tech
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/trading'
                      className='page-redirect'
                    >
                      Trading
                    </a>
                  </div>
                  <div className="line-con">
                    <div className="line"></div>
                    <a
                      href='/work/thumbnail/vlog_lifestyle'
                      className='page-redirect'
                    >
                      Vlog Lifestyle
                    </a>
                  </div>
                </div>
                <div className="line"></div>
                <a href="#">Thumbnails</a>
              </div>
            </div>
            <div className="line-con">
              <div className="line"></div>
              <p className="sub-child-opener">Graphic Design</p>
            </div>
          </div>
          <div className="nav-item courier">
            <div className="line-con">
              <div className="line"></div>
              <a href="#about-section">About</a>
            </div>
          </div>
          <div className="nav-item courier">
            <div className="line-con">
              <div className="line"></div>
              <a href="#contact-section">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
