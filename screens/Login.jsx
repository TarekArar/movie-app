import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useAuthContext } from "../contexts/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuthContext();

  const loginUser = () => {
    setError("");

    var validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!email.match(validEmailRegex)) {
      setError("Please enter a Valid Email");
      return;
    }

    try {
      login(email, password);
    } catch (err) {
      setError("Invalid Credentails");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FlixFlox</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          // value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          // value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {error && (
        <TouchableOpacity>
          <Text style={styles.error}>{error}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.forgot}>Dont have an account?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={loginUser}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#3E54AC",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ECF2FF",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  error: {
    color: "red",
    fontSize: 11,
    marginBottom: 20,
  },
  forgot: {
    color: "#655DBB",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#3E54AC",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
