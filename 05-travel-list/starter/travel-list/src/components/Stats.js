// prettier-ignore
export default function Stats({ items }) {
    if(!items.length) return (<p className="stats"><em>Start adding some items to your packing list 🚀</em></p>)
    const numItems = items.length;
    const numPacked = items.reduce(
      (acc, currentValue) => acc + (currentValue.packed ? 1 : 0), 0
    );
    const percentage = Math.floor((numPacked / items.length) * 100) ;
    return (
      <footer className="stats">
        <em>
        {percentage>=99 ? 'You got everything! Ready to go ✈' : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} items ${percentage}%`}
        </em> 
      </footer>
    );
  }
