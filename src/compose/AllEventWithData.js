import { graphql, compose } from 'react-apollo';

import ListEvents from '../queries/ListEvents';
import DeleteEvent from '../queries/DeleteEvent';
import AllEvents from '../components/AllEvents'

const AllEventWithData = compose(
  graphql(ListEvents, {
      options: {
        fetchPolicy: 'cache-and-network'
      },
      props: (props) => ({
        events: props.data.listEvents ? props.data.listEvents.items : [],
      })
  }),
  graphql(DeleteEvent, {
    options:{
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => ({
        onDelete: (event) => {
          props.mutate({
            variables: { id: event.id },
            optimisticResponse: () => ({ deleteEvent: { ...event, __typename: 'Event', comments: {__typename:"CommentConnection",items:[], nextToken:null} } }),
          })
        }
    }),
    options: {
      refetchQueries: [{ query: ListEvents }],
      update: (dataProxy, { data: { deleteEvent: { id } } }) => {
        const query = ListEvents;
        const data = dataProxy.readQuery({ query });
        data.listEvents.items = data.listEvents.items.filter(event => event.id !== id);
        dataProxy.writeQuery({ query, data });
      }
    }
  }),
)(AllEvents);

export default AllEventWithData
