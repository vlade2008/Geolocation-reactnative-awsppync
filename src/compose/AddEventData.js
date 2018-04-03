import { graphql, compose } from 'react-apollo';

import CreateEvent from '../queries/CreateEvent';
import ListEvents from '../queries/ListEvents';
import AddEvent from '../components/AddEvent'


const AddEventData = compose(
  graphql(CreateEvent, {
    options:{
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => ({
        onAdd: event => {
          props.mutate({
            variables: event,
            optimisticResponse: () => ({ createEvent: { ...event, __typename: 'Event', comments: {__typename:"CommentConnection",items:[], nextToken:null} }}),
          });
       }
    }),
    options: {
      refetchQueries: [{ query: ListEvents }],
      update: (dataProxy, { data: { createEvent } }) => {
        const query = ListEvents;
        const data = dataProxy.readQuery({ query });
        data.listEvents.items.push(createEvent);
        dataProxy.writeQuery({ query, data });
      }
    }
  })
)(AddEvent);


export default AddEventData
