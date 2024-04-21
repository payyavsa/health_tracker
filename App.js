import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [intakeList, setIntakeList] = useState([]);

  const handleAddIntake = () => {
    if (food.trim() && calories > 0) {
      const newIntake = { food, calories };
      setIntakeList([...intakeList, newIntake]);
      setTotalCalories(totalCalories + calories);
      setFood('');
      setCalories(0);
    }
  };

  return (
    <View style={styles.container}>
      {currentPage === 'home' && (
        <View>
          <Text style={styles.heading}>Home</Text>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentPage('nutritionIntake')}>
            <Text style={styles.buttonText}>Nutrition Intake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentPage('calorieTracker')}>
            <Text style={styles.buttonText}>Calorie Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentPage('profile')}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentPage === 'nutritionIntake' && (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('home')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Nutrition Intake</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter food consumed"
            value={food}
            onChangeText={text => setFood(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter calories"
            value={calories.toString()}
            onChangeText={text => setCalories(parseInt(text) || 0)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddIntake}>
            <Text style={styles.buttonText}>Add Intake</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentPage === 'calorieTracker' && (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('home')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Calorie Tracker</Text>
          <Text>Goal: {calorieGoal} calories</Text>
          <Text>Total Calories: {totalCalories}</Text>
          <Text>Remaining Calories: {calorieGoal - totalCalories}</Text>
          <FlatList
            data={intakeList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.intakeItem}>
                <Text>{item.food}: {item.calories} calories</Text>
              </View>
            )}
          />
        </View>
      )}

      {currentPage === 'profile' && (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('home')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter calorie goal"
            value={calorieGoal.toString()}
            onChangeText={text => setCalorieGoal(parseInt(text) || 0)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={() => setCurrentPage('home')}>
            <Text style={styles.buttonText}>Set Goal</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  intakeItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;
