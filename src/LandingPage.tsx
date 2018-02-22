import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import LandingImage from './LandingImage';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <LandingImage />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;