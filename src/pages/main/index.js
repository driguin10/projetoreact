import React, { Component } from 'react';
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/container';
import api from '../../services/api';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositorys: [],
    loading: false,
  };

  componentDidMount() {
    const repositorys = localStorage.getItem('repositorys');
    if (repositorys) {
      this.setState({ repositorys: JSON.parse(repositorys) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositorys } = this.state;
    if (prevState.repositorys !== repositorys) {
      localStorage.setItem('repositorys', JSON.stringify(repositorys));
    }
  }

  handleInput = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newRepo, repositorys } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      repositorys: [...repositorys, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositorys } = this.state;
    return (
      <Container>
        <h1>
          <FaGitAlt />
          Repositorios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={newRepo}
            placeholder="Adicionar repositorio"
            onChange={this.handleInput}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositorys.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
