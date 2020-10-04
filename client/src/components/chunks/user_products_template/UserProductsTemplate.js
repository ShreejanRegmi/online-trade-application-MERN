import React, { Fragment } from 'react'
import ProductDivTemplate from '../../products/ProductDivTemplate';
import Spinner from '../../layout/Spinner';

const UserProductsTemplate = ({ addedFurnitures, addedMobiles, addedVehicles, addedComputers, itemsLoading }) => {
    return (
        <Fragment>
            {itemsLoading === true ? (<div className="row mt-4">
                <div className="col">
                    <Spinner />
                </div>
            </div>)
                :
                <div className="row mt-4 justify-content-left">
                    {addedFurnitures.length > 0 && addedFurnitures.map(p =>
                        <ProductDivTemplate key={p._id} id={p._id} title={p.title} description={p.description}
                            datePosted={p.datePosted} price={p.price} soldFrom={p.soldFrom} condition={p.condition} c={p.type}
                            archived={p.archived} userArchived={p.userArchived} images={p.images} />
                    )}
                    {addedMobiles.length > 0 && addedMobiles.map(p =>
                        <ProductDivTemplate key={p._id} id={p._id} title={p.title} description={p.description}
                            datePosted={p.datePosted} price={p.price} soldFrom={p.soldFrom} condition={p.condition} c={p.type}
                            archived={p.archived} userArchived={p.userArchived} images={p.images} />
                    )}
                    {addedVehicles.length > 0 && addedVehicles.map(p =>
                        <ProductDivTemplate key={p._id} id={p._id} title={p.title} description={p.description}
                            datePosted={p.datePosted} price={p.price} soldFrom={p.soldFrom} condition={p.condition} c={p.type}
                            archived={p.archived} userArchived={p.userArchived} images={p.images} />
                    )}
                    {addedComputers.length > 0 && addedComputers.map(p =>
                        <ProductDivTemplate key={p._id} id={p._id} title={p.title} description={p.description}
                            datePosted={p.datePosted} price={p.price} soldFrom={p.soldFrom} condition={p.condition} c={p.type}
                            archived={p.archived} userArchived={p.userArchived} images={p.images} />
                    )}

                </div>
            }
        </Fragment>
    )
}

export default UserProductsTemplate;