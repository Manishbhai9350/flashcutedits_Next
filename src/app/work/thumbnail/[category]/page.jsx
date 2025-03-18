'use client'
import '@/app/work.css'
import { useParams, useRouter } from 'next/navigation';
import { WorkData } from '@/app/work_data';
import ContactForm from '@/app/_components/ContactForm';

const Thumbnail = () => {
    const { category } = useParams(); // Get the dynamic parameter
    const ThumbnailData = WorkData['graphic_designing'].Categories[category]

  return (
    <main>
      <section className="works">
        <div className="works-title">
          <h2 style={{textAlign:'center'}}>{ThumbnailData.title}</h2>
        </div>
        <div className="works-content">
          {ThumbnailData?.works ? (
            ThumbnailData.works.map((work, index) => {
              return (
                <div key={index} className="thumbnail-item">
                  <div className="thumbnail">
                    <Image fill src={work.img} alt="WorkImage" />
                  </div>
                  <div className="content">
                    <div className="tag">
                      <p>{work.tag}</p>
                    </div>
                  </div>
                </div>
              );
            }) ) : (
                <h1>No Work Available</h1>
            )
        }
        </div>
      </section>
      <section id="contact-section" className="work-contact-section">
        <ContactForm />
      </section>
    </main>
  )
}

export default Thumbnail