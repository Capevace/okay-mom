import React from 'react';
import { Link } from 'react-router';

function FamilyLinkList({ familyObjects }) {
  return (
    <ul>
      {Object.keys(familyObjects).map((familyKey) => {
        const { familyLoading, familyData } = familyObjects[familyKey];
        return (
          <li key={familyKey}>
            <Link to={`/family/${familyKey}`}>{familyLoading ? 'Loading Family...' : familyData.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

FamilyLinkList.propTypes = {
  familyObjects: React.PropTypes.shape({}).isRequired,
};

export default FamilyLinkList;
