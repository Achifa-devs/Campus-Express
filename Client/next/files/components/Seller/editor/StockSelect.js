
const StockSelect = ({edit,productStock}) => {
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Stock <small>(Quantity Availble For Sale)</small></label>
                <input type="number" defaultValue={window.localStorage.getItem('draft_stock')} name='stock' placeholder="Stock" onInput={e => productStock(e.target.value)} />
            </div>
        </>
     );
}
 
export default StockSelect;