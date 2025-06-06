import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export function filterProducts(products, filters) {
  return products.filter(product => {
    const {
      category,
      state,
      lga
      
      } = filters;
    
    const matchesCategory = category ? product.category === category : true;
    const matchesState = state ? Object.values(data)[0].location['address2'] === state : true;
    const matchesLga = lga ? Object.values(data)[0].location['address3'] === lga : true;
   
    return (
      matchesCategory &&
      matchesState &&
      matchesLga 
    );
  });
}

















