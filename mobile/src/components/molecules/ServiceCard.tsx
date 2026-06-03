import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../organisms/Card';
import { Icon } from '../atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { typography } from '../../tokens/typography';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  style?: any;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, selected, ...rest }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <Card
      style={[{ borderColor: selected ? colors.primary.main : 'transparent', borderWidth: selected ? 2 : 0 }, rest.style]}
      {...rest}
    >
      <View style={styles.serviceInfo}>
        <View>
          <Text style={styles.serviceName} testID="srv-name">{service.name}</Text>
          <Text style={styles.servicePrice} testID="srv-price">R$ {service.price.toFixed(2)}</Text>
        </View>
        <Icon name="PlusCircle" color={colors.secondary.main} />
      </View>
    </Card>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    serviceInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    serviceName: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.text.primary },
    servicePrice: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.secondary.main, marginTop: 2 },
  });
}
