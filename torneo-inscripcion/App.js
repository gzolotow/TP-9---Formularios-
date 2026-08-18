import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// ---------------------------------------------------------------------------
// Componente reutilizable para los campos de texto
// ---------------------------------------------------------------------------
function CampoFormulario({ label, value, onChangeText, error, keyboardType, placeholder, maxLength }) {
  return (
    <View style={styles.campoContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType || 'default'}
        maxLength={maxLength}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Pantalla principal
// ---------------------------------------------------------------------------
const CATEGORIAS = ['Sub-16', 'Libre'];

export default function App() {
  // Un solo objeto de estado para los 5 campos
  const [form, setForm] = useState({
    nombreEquipo: '',
    nombreCapitan: '',
    email: '',
    telefono: '',
    categoria: '',
  });

  const [enviado, setEnviado] = useState(false); // para mostrar errores solo tras intentar confirmar

  const actualizarCampo = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  // -------------------------------------------------------------------------
  // Validaciones
  // -------------------------------------------------------------------------
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };

  const validarSoloNumeros = (telefono) => {
    return /^[0-9]+$/.test(telefono.trim());
  };

  const getErrores = () => {
    const errores = {};

    // nombreEquipo
    const nombreEquipoTrim = form.nombreEquipo.trim();
    if (nombreEquipoTrim.length === 0) {
      errores.nombreEquipo = 'El nombre del equipo es obligatorio.';
    } else if (nombreEquipoTrim.length < 3 || nombreEquipoTrim.length > 20) {
      errores.nombreEquipo = 'Debe tener entre 3 y 20 caracteres.';
    }

    // nombreCapitan
    if (form.nombreCapitan.trim().length === 0) {
      errores.nombreCapitan = 'El nombre del capitán es obligatorio.';
    }

    // email
    const emailTrim = form.email.trim();
    if (emailTrim.length === 0) {
      errores.email = 'El email es obligatorio.';
    } else if (!validarEmail(emailTrim)) {
      errores.email = 'El formato del email no es válido.';
    }

    // telefono
    const telefonoTrim = form.telefono.trim();
    if (telefonoTrim.length === 0) {
      errores.telefono = 'El teléfono es obligatorio.';
    } else if (!validarSoloNumeros(telefonoTrim)) {
      errores.telefono = 'El teléfono solo puede contener números.';
    }

    // categoria
    if (form.categoria.trim().length === 0) {
      errores.categoria = 'Elegí una categoría.';
    }

    return errores;
  };

  const errores = getErrores();
  const hayErrores = Object.keys(errores).length > 0;

  const mostrarError = (campo) => (enviado ? errores[campo] : undefined);

  const handleConfirmar = () => {
    setEnviado(true);
    if (!hayErrores) {
      // Acá iría el envío real de la inscripción
      alert(`Equipo "${form.nombreEquipo}" inscripto en categoría ${form.categoria} ✅`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Inscripción al Torneo</Text>
          <Text style={styles.subtitulo}>Fortnite - FNCS 2026</Text>

          <CampoFormulario
            label="Nombre del equipo"
            value={form.nombreEquipo}
            onChangeText={(v) => actualizarCampo('nombreEquipo', v)}
            error={mostrarError('nombreEquipo')}
            keyboardType="default"
            placeholder="Ej: Los Invencibles"
            maxLength={20}
          />

          <CampoFormulario
            label="Nombre del capitán"
            value={form.nombreCapitan}
            onChangeText={(v) => actualizarCampo('nombreCapitan', v)}
            error={mostrarError('nombreCapitan')}
            keyboardType="default"
            placeholder="Ej: Juan Pérez"
          />

          <CampoFormulario
            label="Email"
            value={form.email}
            onChangeText={(v) => actualizarCampo('email', v)}
            error={mostrarError('email')}
            keyboardType="email-address"
            placeholder="Ej: equipo@mail.com"
          />

          <CampoFormulario
            label="Teléfono"
            value={form.telefono}
            onChangeText={(v) => actualizarCampo('telefono', v)}
            error={mostrarError('telefono')}
            keyboardType="phone-pad"
            placeholder="Ej: 1122334455"
          />

          {/* Categoría: dos botones tipo toggle */}
          <View style={styles.campoContainer}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.toggleContainer}>
              {CATEGORIAS.map((cat) => {
                const seleccionado = form.categoria === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.toggleBoton, seleccionado && styles.toggleBotonSeleccionado]}
                    onPress={() => actualizarCampo('categoria', cat)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.toggleTexto,
                        seleccionado && styles.toggleTextoSeleccionado,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {mostrarError('categoria') ? (
              <Text style={styles.errorText}>{mostrarError('categoria')}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.botonConfirmar, hayErrores && styles.botonDeshabilitado]}
            onPress={handleConfirmar}
            disabled={hayErrores}
            activeOpacity={0.8}
          >
            <Text style={styles.botonConfirmarTexto}>Confirmar inscripción</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Estilos
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: '#8B8BA7',
    marginBottom: 24,
  },
  campoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D6D6E7',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1C1C2E',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2E2E45',
  },
  inputError: {
    borderColor: '#FF5C5C',
  },
  errorText: {
    color: '#FF5C5C',
    fontSize: 12,
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleBoton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E2E45',
    backgroundColor: '#1C1C2E',
    alignItems: 'center',
  },
  toggleBotonSeleccionado: {
    backgroundColor: '#6C4DFF',
    borderColor: '#6C4DFF',
  },
  toggleTexto: {
    color: '#D6D6E7',
    fontWeight: '600',
  },
  toggleTextoSeleccionado: {
    color: '#FFFFFF',
  },
  botonConfirmar: {
    backgroundColor: '#6C4DFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  botonDeshabilitado: {
    backgroundColor: '#3A3A55',
  },
  botonConfirmarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
