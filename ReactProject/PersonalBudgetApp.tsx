import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Alert } from 'react-native';

interface Expense {
  id: number;
  desc: string;
  amount: number;
}

const PersonalBudgetApp = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  // --- WEB DATA PERSISTENCE (localStorage) ---
  useEffect(() => {
    const savedIncome = localStorage.getItem('@monthly_income');
    const savedExpenses = localStorage.getItem('@expense_list');
    if (savedIncome) setIncome(parseFloat(savedIncome));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem('@monthly_income', income.toString());
    localStorage.setItem('@expense_list', JSON.stringify(expenses));
    
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    setBalance(income - totalExpenses);
  }, [income, expenses]);

  const addExpense = () => {
    if (description && amount) {
      setExpenses([{ id: Date.now(), desc: description, amount: parseFloat(amount) }, ...expenses]);
      setDescription('');
      setAmount('');
    }
  };

  // --- WEB-SPECIFIC CSV EXPORT ---
  const exportToExcel = () => {
    if (expenses.length === 0) {
      alert("Add some expenses before exporting!");
      return;
    }

    let csvContent = "Description,Amount,Date\n"; 
    expenses.forEach(item => {
      const date = new Date(item.id).toLocaleDateString();
      csvContent += `${item.desc},${item.amount},${date}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Budget_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchBankTransactions = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const newExpenses = data.slice(0, 3).map((item: any, index: number) => ({
        id: Date.now() + index,
        desc: `Online Trf: ${item.id}`,
        amount: Math.floor(Math.random() * 5000) + 500,
      }));
      setExpenses(prev => [...newExpenses, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.transactionCard}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>₦</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.expenseDesc}>{item.desc}</Text>
        <Text style={styles.dateText}>{new Date(item.id).toLocaleDateString()} • Success</Text>
      </View>
      <Text style={styles.expenseAmount}>- ₦{item.amount.toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* Balance Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Current Balance</Text>
        <Text style={styles.balanceText}>₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        
        <View style={styles.incomeInputRow}>
          <Text style={styles.incomeLabel}>Monthly Income:</Text>
          <TextInput
            style={styles.incomeInput}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#A0A0A0"
            value={income > 0 ? income.toString() : ''}
            onChangeText={(text) => setIncome(parseFloat(text) || 0)}
          />
        </View>
      </View>

      <View style={styles.contentBody}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Add Transaction</Text>
          <TouchableOpacity onPress={exportToExcel}>
            <Text style={styles.exportLink}>Save Transactions</Text>
          </TouchableOpacity>
        </View>
        
        {/* Input Form */}
        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Item Description"
            placeholderTextColor="#94A3B8"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount (₦)"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.addBtn} onPress={addExpense}>
              <Text style={styles.btnText}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.syncBtn} onPress={fetchBankTransactions}>
              <Text style={styles.syncBtnText}>Fetch Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transaction History</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderExpense}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    padding: 30,
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)', // Web-specific shadow
  },
  headerSubtitle: { color: '#94A3B8', fontSize: 14, fontWeight: '600', marginBottom: 5 },
  balanceText: { color: '#F8FAFC', fontSize: 36, fontWeight: '800', marginBottom: 20 },
  incomeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  incomeLabel: { color: '#64748B', fontSize: 12, fontWeight: '700' },
  incomeInput: { color: '#10B981', padding: 10, fontSize: 14, fontWeight: '700', minWidth: 80, outlineStyle: 'none' as any },
  contentBody: { flex: 1, paddingHorizontal: 20, paddingTop: 10, maxWidth: 600, alignSelf: 'center', width: '100%' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '700', marginVertical: 15 },
  exportLink: { color: '#6366F1', fontWeight: '700', fontSize: 14, cursor: 'pointer' as any },
  formCard: { backgroundColor: '#1E293B', borderRadius: 20, padding: 20, marginBottom: 10 },
  input: { backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: 12, padding: 12, marginBottom: 10, fontSize: 14, outlineStyle: 'none' as any },
  buttonRow: { flexDirection: 'row', gap: 10 },
  addBtn: { flex: 2, backgroundColor: '#6366F1', padding: 15, borderRadius: 12, alignItems: 'center', cursor: 'pointer' as any },
  syncBtn: { flex: 1, borderWidth: 1, borderColor: '#334155', padding: 15, borderRadius: 12, alignItems: 'center', cursor: 'pointer' as any },
  btnText: { color: '#FFF', fontWeight: '700' },
  syncBtnText: { color: '#94A3B8', fontWeight: '700' },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    
  },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#334155', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconText: { color: '#94A3B8', fontSize: 18, fontWeight: 'bold' },
  itemInfo: { flex: 1 },
  expenseDesc: { color: '#F8FAFC', fontSize: 15, fontWeight: '600' },
  dateText: { color: '#64748B', fontSize: 11, marginTop: 2 },
  expenseAmount: { color: '#F43F5E', fontSize: 14, fontWeight: '700' },
});

export default PersonalBudgetApp;