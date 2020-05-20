/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  "list-sorters": function(t) {
    return [
      {
        text: "Checklist due date",
        callback: function(t, opts) {
          // Trello will call this if the user clicks on this sort
          // opts.cards contains all card objects in the list
          var sortedCards = opts.cards.sort(function(a, b) {
            var dateA = a.badges.checkItemsEarliestDue ? Date.parse(a.badges.checkItemsEarliestDue): Number.MAX_SAFE_INTEGER;
            var dateB = b.badges.checkItemsEarliestDue ? Date.parse(b.badges.checkItemsEarliestDue): Number.MAX_SAFE_INTEGER;
            if (dateA > dateB) {
              return 1;
            } else if (dateB > dateA) {
              return -1;
            }
            return 0;
          });

          return {
            sortedIds: sortedCards.map(function(c) {
              return c.id;
            })
          };
        }
      }
    ];
  }
});
