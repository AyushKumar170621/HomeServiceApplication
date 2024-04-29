import React from 'react';

function FeatureSection() {
  return (
    <section className="feature_section">
      <div className="container">
        <div className="feature_container">
          <div className="box">
            <div className="img-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="512"
                height="512"
              >
                {/* Your SVG paths */}
              </svg>
            </div>
            <h5 className="name">Repair</h5>
          </div>
          <div className="box active">
            <div className="img-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="512"
                height="512"
              >
                {/* Your SVG paths */}
              </svg>
            </div>
            <h5 className="name">Improve</h5>
          </div>
          <div className="box">
            <div className="img-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="512"
                height="512"
              >
                {/* Your SVG paths */}
              </svg>
            </div>
            <h5 className="name">Maintain</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
