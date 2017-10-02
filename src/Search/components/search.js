import React, { Component } from 'react';
import {
	Row,
	Col,
	Modal,
	FormGroup,
	FormControl,
	InputGroup,
	Button,
	Pagination
} from 'react-bootstrap';
import ReactTable from 'react-table';
import queryString from 'query-string';

import client from '../../Feathers';
import searchActions from '../actions/searchActions';
import './search.css';

const DetailLine = ({ left, right }) => (
	<div className="detail-line">
		<div className="detail-line-left">{left}</div>
		<div className="detail-line-right">{right}</div>
	</div>
);

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: '',
      modalInfo: null,
			showModal: false,
			userHasTyped: false,
			pages: 0,
			activePage: 0,
			limit: 0
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    if (search && queryString.parse(search).q) {
      this.setState({ searchTerm: queryString.parse(search).q, userHasTyped: true }, () => {
        this.search();
      });
    }

    this.searchInput.focus();
  }

  search = () => {
    const donationOffer = client.service('donation-offer');
    this.setState({
			results: [],
			userHasTyped: true,
			pages: 1,
			activePage: 1,
			limit: 0
    });
    if (this.state.searchTerm.length) {
			this.props.history.replace(`/search?q=${this.state.searchTerm}`);
      return donationOffer
        .find({ query: { $search: this.state.searchTerm } })
        .then(resultResponse => {
          this.setState({
						results: resultResponse.data,
						pages: (resultResponse.total / resultResponse.limit) + 1,
						limit: resultResponse.limit
					});
				})
        .catch(alert);
    } else {
      return this.setState({ results: [] });
    }
  };

  claim = id => {
    const data = {
      acceptedBy: 'Placeholder Name',
      id
    };
    searchActions.acceptDonation(data);
  };

  handleRowClick = rowInfo => {
    return (e, handleOriginal) => {
      console.log('It was in this row:', rowInfo);

      this.setState({
        modalInfo: rowInfo.original,
        showModal: true
      });

      if (handleOriginal) {
        handleOriginal();
      }
		};
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalInfo: null
    });
	};

	handleSelect = (eventKey) => {
		const activePage = eventKey;
		const skip = (eventKey - 1) * this.state.limit;
		const donationOffer = client.service('donation-offer');

		return donationOffer
		.find({ query: { $search: this.state.searchTerm, $skip: skip } })
		.then(resultResponse => {
			this.setState({
				results: resultResponse.data,
				activePage: activePage
			});
		})
		.catch(alert);
	};

  render() {
		const { userHasTyped, showModal, modalInfo, results, searchTerm } = this.state;
		
		let content = null;
		
    if (userHasTyped) {
      content = (
        <ReactTable
          data={results}
          columns={[
            {
              Header: 'Full Name',
              accessor: 'fullname'
            },
            {
              Header: 'Organization',
              accessor: 'organizationName'
            },
            {
              Header: 'Phone Number',
              accessor: 'phoneNumber'
            },
            {
              Header: 'Email',
              accessor: 'email'
            },
            {
              Header: 'Category',
              accessor: 'donationCategory'
            },
            {
              Header: 'Location',
              accessor: 'locationOfDonation'
            },
            {
              Header: 'Confirmed',
							id: 'isConfirmed',
              accessor: d => d.isConfirmed ? 'YES' : 'NO'
            },
            {
              Header: 'Verified',
							id: 'isVerified',
							accessor: d => d.isVerified ? 'YES' : 'NO'
            },
            {
              Header: 'Accepted',
							id: 'isAccepted',
							accessor: d => d.isAccepted ? 'YES' : 'NO'
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTdProps={(state, rowInfo) => ({
            onClick: this.handleRowClick(rowInfo)
          })}
					showPageSizeOptions={false}
					showPagination={false}
        />
      );
		}
		
		let modalBody = null;

		if (modalInfo) {
			modalBody = (
				<Modal.Body>
					<div className="detail-description">
						<h4 className="detail-description-header">Description</h4>
						<p>{modalInfo.detailedDescription ? modalInfo.detailedDescription : ''}</p>
					</div>
					<br/>
					<br/>
					<div className="details-header">
						<h4>Details</h4>
					</div>
					<DetailLine left="FULLNAME" right={modalInfo.fullname}/>
					<DetailLine left="ORGANIZATION" right={modalInfo.organizationName}/>
					<DetailLine left="ORGANIZATION TYPE" right={modalInfo.organizationType}/>
					<DetailLine left="EMAIL" right={modalInfo.email}/>
					<DetailLine left="PHONE NUMBER" right={modalInfo.phoneNumber}/>
					<DetailLine left="CATEGORY" right={modalInfo.donationCategory}/>
					<DetailLine left="LOCATION" right={`${modalInfo.locationOfDonation}, ${modalInfo.zipCode}`}/>
					<DetailLine left="NEEDS TRANSPORTATION" right={modalInfo.transportationNeed ? 'YES' : 'NO'}/>
					<DetailLine left="TRANSPORTATION TYPE" right={modalInfo.transportationType}/>
					{modalInfo.expDate ? <DetailLine left="EXPIRATION DATE" right={modalInfo.expDate}/> : null}
					<DetailLine left="CONFIRMED" right={modalInfo.isConfirmed ? 'YES' : 'NO'}/>
					<DetailLine left="VERIFIED" right={modalInfo.isVerified ? 'YES' : 'NO'}/>
					<DetailLine left="ACCEPTED" right={modalInfo.isAccepted ? 'YES' : 'NO'}/>
					<br/>
					<br/>
					<div className="detail-notes">
						<h4 className="detail-notes-header">Notes</h4>
						<p>{modalInfo.notes ? modalInfo.notes : ''}</p>
					</div>
				</Modal.Body>
			);
		}

    return (
      <div>
        <h1 className="text-center">Find Donation Offers</h1>
        <br />
        <Row>
          <Col sm={4} smOffset={4}>
            <FormGroup>
              <InputGroup>
                <FormControl
                  type="text"
                  inputRef={input => this.searchInput = input}
                  id="searchTerm"
                  placeholder="Search Donations..."
                  value={searchTerm}
                  onChange={this.handleInputChange}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.search();
										}
									}}
                />
                <InputGroup.Button>
                  <Button onClick={this.search}>Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <div className="results" style={{ marginBottom: 80 }}>
					{content}
					<Pagination
						bsSize="medium"
						items={this.state.pages}
						activePage={this.state.activePage}
						onSelect={this.handleSelect}
					/>
				</div>
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>More Information</Modal.Title>
          </Modal.Header>
          {modalBody}
        </Modal>
      </div>
    );
  }
}
