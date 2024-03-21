import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, IconButton, Text, Heading, theme, useColorModeValue, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("gray.100", "gray.700");

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Todo can't be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg={bg} minH="100vh" py={10}>
        <VStack spacing={8} justifyContent="center">
          <Heading mb={6}>Todo App</Heading>
          <HStack>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add a todo" />
            <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} />
          </HStack>
          <VStack spacing={4} align="stretch">
            {todos.map((todo) => (
              <HStack key={todo.id} borderWidth="1px" borderRadius="lg" p={4} justifyContent="space-between" w="100%">
                <Text>{todo.content}</Text>
                <IconButton size="sm" colorScheme="red" aria-label="Delete todo" icon={<FaTrash />} onClick={() => handleRemoveTodo(todo.id)} />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
