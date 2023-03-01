import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import StyledInput from "../components/StyledInput";
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

      <StyledInput placeholder="Email..." onChangeText={setEmail} />
      <StyledInput
        secureTextEntry
        placeholder="Password..."
        onChangeText={setPassword}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.forgot}>Dont have an account?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={loginUser}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
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
