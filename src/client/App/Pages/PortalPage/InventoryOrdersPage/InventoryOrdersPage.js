
import React, { useState } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Input from '../../../Components/Input/Input';
import SubmitButton from '../../../Components/SubmitButton/SubmitButton';
import FillInventoryOrderMutation from '../mutations/FillInventoryOrderMutation';
import DeleteInventoryOrderMutation from '../mutations/DeleteInventoryOrderMutation';
import styles from '../PortalPage.css';

const InventoryOrdersPage = ( props ) => {
    const deleteInventoryOrder = ( inventory_order ) => {
        const { inventory_order_id } = inventory_order;
        const form = {
            inventory_order_id,
        };
        DeleteInventoryOrderMutation.commit( form );
    };
    // console.log( 'Inventory order page props:', props );
    const { viewer, pending_orders_list, filled_orders_list } = props;
    return (
        <div className={ styles.InventoryOrdersPage }>
            <div className={ styles.PendingList }>
                <div className={ styles.Title }>Pending Orders</div>
                <div className={ styles.Header }>
                    <div className={ styles.Id }>Product ID</div>
                    <div className={ styles.Name }>Product Name</div>
                    <div className={ styles.CurrentQuantity }>Current Quantity</div>
                    <div className={ styles.Threshold }>Threshold</div>
                    <div className={ styles.ReceiveDate }>Receive Date</div>
                    <div className={ styles.Form }></div>
                </div>
                <div className={ styles.Body }>
                    { pending_orders_list ? pending_orders_list.pending_orders_list.edges.map(( inventory_order, i ) => {
                        inventory_order = inventory_order.node;
                        return (
                            <PendingInventoryOrder 
                                key={ i } 
                                viewer={ viewer }
                                inventory_order={ inventory_order }
                                deleteInventoryOrder={ deleteInventoryOrder } />
                        )
                    }) : 'There are no pending inventory orders.' }
                </div>
            </div>
            <div className={ styles.FilledList }>
                <div className={ styles.Title }>Filled Orders</div>
                <div className={ styles.Header }>
                    <div className={ styles.Id }>Product ID</div>
                    <div className={ styles.Name }>Product Name</div>
                    <div className={ styles.Quantity }>Quantity Filled</div>
                    <div className={ styles.ReceiveDate }>Receive Date</div>
                    <div className={ styles.FillDate }>Fill Date</div>
                    <div className={ styles.FilledBy }>Filled By</div>
                </div>
                <div className={ styles.Body }>
                    { filled_orders_list ? filled_orders_list.filled_orders_list.edges.map(( inventory_order, i ) => {
                        inventory_order = inventory_order.node;
                        return (
                            <FilledInventoryOrder 
                                key={ i } 
                                inventory_order={ inventory_order }
                                deleteInventoryOrder={ deleteInventoryOrder } />
                        )
                    }) : 'There are no filled inventory orders.' }
                </div>
            </div>
        </div>
    )
};

const PendingInventoryOrder = ({ viewer, inventory_order  }) => {
    const { inventory_order_id, product, status, created_at } = inventory_order;
    const { product_id, name, quantity, threshold } = product;
    const [ formQuantity, updateFormQuantity ] = useState( );
    const fillInventoryOrder = ( ) => {
        const form = {
            inventory_order_id,
            user_id: viewer.user_id,
            product_id,
            quantity: formQuantity
        };
        console.log( 'form:', form );
        FillInventoryOrderMutation.commit( form );
    };
    return (
        <div className={ styles.InventoryOrder }>
            <div className={ styles.Id }>{ product_id }</div>
            <div className={ styles.Name }>{ name }</div>
            <div className={ styles.CurrentQuantity }>{ quantity }</div>
            <div className={ styles.Threshold }>{ threshold }</div>
            <div className={ styles.ReceiveDate }>{ created_at }</div>
            <div className={ styles.Form }>
                <Input name={ 'inventory-order-quantity' } placeholder={ '' } onChange={ e => updateFormQuantity( e.target.value ) } />
                <SubmitButton onClick={ ( e ) => fillInventoryOrder( e, inventory_order ) } text={ 'Fill order' } />
            </div>
        </div>
    )
};

const FilledInventoryOrder = ({ inventory_order  }) => {
    const { inventory_order_id, product, quantity, status, created_at, filled_at, filled_by } = inventory_order;
    const { first_name, last_name } = filled_by;
    const { product_id, name } = product;
    return (
        <div className={ styles.InventoryOrder }>
            <div className={ styles.Id }>{ product_id }</div>
            <div className={ styles.Name }>{ name }</div>
            <div className={ styles.Quantity }>{ quantity }</div>
            <div className={ styles.ReceiveDate }>{ created_at }</div>
            <div className={ styles.FillDate }>{ filled_at }</div>
            <div className={ styles.FilledBy }>{ first_name + " " + last_name }</div>
        </div>
    )
};


export default createFragmentContainer( InventoryOrdersPage, {
    pending_orders_list: graphql`
        fragment InventoryOrdersPage_pending_orders_list on Query @argumentDefinitions (
            first: { type: "Int" }
        ) {
            pending_orders_list ( first: 10 ) @connection( key: "InventoryOrdersPage_pending_orders_list" ) {
                edges {
                    node {
                        inventory_order_id
                        product {
                            product_id
                            name
                            threshold
                            quantity
                        }
                        created_at
                    }
                }
            },
        }
    `,
    filled_orders_list: graphql`
        fragment InventoryOrdersPage_filled_orders_list on Query @argumentDefinitions (
            first: { type: "Int" }
        ) {
            filled_orders_list ( first: 10 ) @connection( key: "InventoryOrdersPage_filled_orders_list" ) {
                edges {
                    node {
                        product {
                            product_id
                            name
                            threshold
                        }
                        created_at
                        filled_at
                        filled_by {
                            first_name
                            last_name
                        }
                    }
                }
            },
        }
    `,
});