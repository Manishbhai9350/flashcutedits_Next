'use client'
import ContactForm from '@/app/_components/ContactForm';
import '@/app/work.css'
import {WorkData} from '@/app/work_data'
import { useParams, useRouter } from 'next/navigation';
const BasicEditing = () => {
    const router = useRouter();
    const {category} = useParams()
    const Data = WorkData['basic_editing'].Categories[category]
    const {title,works,type} = Data
  return (
    <main>
      <section className="works">
        <div className="works-title">
          <h1>Advance Editing</h1>
        </div>
        <h3 className="works-sub-type">{title}</h3>
        <div className="works-content">
          {works ? (
            works.map((work, i) => {
              return (
                <div key={i} playing="false" className="video-item">
                  <div className="video">
                    <iframe
                      style={{ width: "100%", height: "100%" }}
                      src={`https://drive.google.com/file/d/${work.id}/preview`}
                      allow="autoplay"
                    ></iframe>
                  </div>
                  <div className="content">
                    <div className="tag">
                      <p>{work.tag}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Work Available</h1>
          )}
        </div>
      </section>
      <section id="contact-section" className="work-contact-section">
        <ContactForm />
      </section>
    </main>
  )
}

export default BasicEditing