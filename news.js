import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner, Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import Menu from './Menu'; // Ensure Menu is correctly imported
import './news.css';
import Logo from './insight .jpg';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: '(education OR health OR sports)', // Search for articles related to education, health, or sports
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: 'f18792fe99204a98ba2313f451b83315', // Replace with your actual API key
          }
        });
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(term) || 
      article.description.toLowerCase().includes(term)
    );
    setFilteredArticles(filtered);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Error loading news: {error.message}</p>;
  }

  return (
    <>
      <Menu />
      <Container className="news-container">
        <Button onClick={handleBackClick} className="back-button">Back</Button>
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
          <h1 className="text">Insights </h1>
          <h1 className="animation-text">Insights </h1>
        </div>
        <h2>Worldwide Education, Health, and Sports News</h2>
        <Form.Group controlId="search">
          <Form.Control 
            type="text" 
            placeholder="Search news..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
        <Row>
          {filteredArticles.length === 0 ? (
            <p>No news articles found.</p>
          ) : (
            filteredArticles.map((article, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card className="news-card">
                  {article.urlToImage && <Card.Img variant="top" src={article.urlToImage} />}
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read more</a>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default News;
